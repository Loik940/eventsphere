/**
 * Service utilisateur.
 * Il regroupera la logique liee au profil, au dashboard et a l'historique des participations.
 */
import { Types } from 'mongoose';

import User from '../models/user.model';

type ServiceError = Error & {
  status?: number;
};

type UpdateUserProfileInput = {
  name?: string;
  avatar?: string;
};

const createServiceError = (message: string, status: number): ServiceError => {
  const error: ServiceError = new Error(message);
  error.status = status;

  return error;
};

const ensureObjectId = (id: string): void => {
  if (!Types.ObjectId.isValid(id)) {
    throw createServiceError('Utilisateur introuvable', 404);
  }
};

export const getUserProfile = async (userId: string) => {
  ensureObjectId(userId);

  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw createServiceError('Utilisateur introuvable', 404);
  }

  return user;
};

export const updateUserProfile = async (userId: string, data: UpdateUserProfileInput) => {
  ensureObjectId(userId);

  const user = await User.findById(userId);

  if (!user) {
    throw createServiceError('Utilisateur introuvable', 404);
  }

  if (data.name !== undefined) {
    user.name = data.name;
  }

  if (data.avatar !== undefined) {
    user.avatar = data.avatar;
  }

  await user.save();

  return User.findById(userId).select('-password');
};

export default {
  getUserProfile,
  updateUserProfile,
};
