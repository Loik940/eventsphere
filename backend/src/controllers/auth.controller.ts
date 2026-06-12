/**
 * Controller d'authentification.
 * Il recevra les requetes register, login et me, puis deleguera la logique au service d'authentification.
 */
import type { RequestHandler } from 'express';

import authService from '../services/auth.service';

export const register: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await authService.getMe(req.user!.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getMe,
};
