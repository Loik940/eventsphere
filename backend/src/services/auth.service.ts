/**
 * Service d'authentification.
 * Il contiendra la logique metier pour creer un compte, verifier un mot de passe et generer un JWT.
 */
import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';

import { config } from '../config/env';
import User from '../models/user.model';
import type { LoginInput, RegisterInput } from '../schemas/auth.schema';

type ServiceError = Error & {
  status?: number;
};

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type LoginResult = {
  token: string;
  user: AuthUser;
};

const createServiceError = (message: string, status: number): ServiceError => {
  const error: ServiceError = new Error(message);
  error.status = status;

  return error;
};

export const register = async (data: RegisterInput): Promise<AuthUser> => {
  const email = data.email.toLowerCase().trim();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createServiceError('Cet email est deja utilise', 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = new User({
    name: data.name.trim(),
    email,
    password: hashedPassword,
  });

  await user.save();

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const login = async (data: LoginInput): Promise<LoginResult> => {
  const email = data.email.toLowerCase().trim();
  const user = await User.findOne({ email });

  if (!user) {
    throw createServiceError('Email ou mot de passe incorrect', 401);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw createServiceError('Email ou mot de passe incorrect', 401);
  }

  const signOptions: SignOptions = {
    expiresIn: config.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.JWT_SECRET,
    signOptions,
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const getMe = async (userId: string): Promise<AuthUser> => {
  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw createServiceError('Utilisateur introuvable', 404);
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export default {
  register,
  login,
  getMe,
};
