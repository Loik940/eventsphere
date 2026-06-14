/**
 * Service d'authentification.
 * Il contiendra la logique metier pour creer un compte, verifier un mot de passe et generer un JWT.
 */
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';

import { config } from '../config/env';
import User from '../models/user.model';
import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  UpdatePasswordInput,
} from '../schemas/auth.schema';

type ServiceError = Error & {
  status?: number;
};

type AuthUser = {
  id: string;
  name: string;
  email: string;
  favorites?: string[];
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
    favorites: user.favorites ? user.favorites.map(f => f.toString()) : [],
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
      favorites: user.favorites ? user.favorites.map(f => f.toString()) : [],
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
    favorites: user.favorites ? user.favorites.map(f => f.toString()) : [],
  };
};

export const forgotPassword = async (data: ForgotPasswordInput): Promise<void> => {
  const email = data.email.toLowerCase().trim();
  const user = await User.findOne({ email });

  if (!user) {
    // Ne pas indiquer si l'email existe ou non pour des raisons de securite
    return;
  }

  // Creer un token aleatoire
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hacher le token pour le stocker en base (securite accrue)
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

  await user.save();

  // Pour le MVP : simulation d'envoi d'email
  const resetUrl = `${config.CORS_ORIGIN}/reset-password/${resetToken}`;
  console.log('==============================================');
  console.log(`[EMAIL SIMULATION] Pour reinitialiser le mot de passe de ${user.email}, cliquez ici :`);
  console.log(resetUrl);
  console.log('==============================================');
};

export const resetPassword = async (token: string, data: ResetPasswordInput): Promise<void> => {
  // Retrouver l'utilisateur avec le token hache
  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: new Date() },
  });

  if (!user) {
    throw createServiceError('Token invalide ou expire', 400);
  }

  // Mettre a jour le mot de passe
  user.password = await bcrypt.hash(data.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
};

export const updatePassword = async (userId: string, data: UpdatePasswordInput): Promise<void> => {
  const user = await User.findById(userId);

  if (!user) {
    throw createServiceError('Utilisateur introuvable', 404);
  }

  const isPasswordValid = await bcrypt.compare(data.currentPassword, user.password);

  if (!isPasswordValid) {
    throw createServiceError('Mot de passe actuel incorrect', 401);
  }

  user.password = await bcrypt.hash(data.newPassword, 10);
  await user.save();
};

export default {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
};
