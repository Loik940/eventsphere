import { Types } from 'mongoose';
import User from '../models/user.model';

const toggleFavorite = async (userId: string, eventId: string) => {
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(eventId)) {
    throw new Error('Identifiants invalides');
  }

  const user = await User.findById(userId);
  if (!user) throw new Error('Utilisateur introuvable');

  const favorites = user.favorites || [];
  const eventObjectId = new Types.ObjectId(eventId);
  const index = favorites.findIndex((id) => id.toString() === eventId);

  if (index === -1) {
    favorites.push(eventObjectId);
  } else {
    favorites.splice(index, 1);
  }

  user.favorites = favorites;
  await user.save();

  return user.favorites;
};

const getFavorites = async (userId: string) => {
  const user = await User.findById(userId).populate('favorites');
  if (!user) throw new Error('Utilisateur introuvable');
  return user.favorites || [];
};

export default {
  toggleFavorite,
  getFavorites,
};
