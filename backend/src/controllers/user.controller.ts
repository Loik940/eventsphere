import type { RequestHandler } from 'express';
import userService from '../services/user.service';

export const toggleFavorite: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const favorites = await userService.toggleFavorite(req.user!.id, req.params.eventId as string);

    res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const getFavorites: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const favorites = await userService.getFavorites(req.user!.id);

    res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  toggleFavorite,
  getFavorites,
};
