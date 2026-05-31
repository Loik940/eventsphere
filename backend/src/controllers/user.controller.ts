/**
 * Controller utilisateur.
 * Il gerera le profil connecte, les informations personnelles et l'historique des participations.
 */
import type { RequestHandler } from 'express';

import userService from '../services/user.service';

export const getProfile: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await userService.getUserProfile(req.user!.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await userService.updateUserProfile(req.user!.id, req.body);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProfile,
  updateProfile,
};
