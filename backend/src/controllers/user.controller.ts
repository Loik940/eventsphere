import type { RequestHandler } from 'express';

import registrationService from '../services/registration.service';
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

export const getUserHistory: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await registrationService.getUserRegistrations(req.user!.id);

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
  getUserHistory,
};
