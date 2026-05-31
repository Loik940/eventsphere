/**
 * Controller des inscriptions.
 * Il gerera les actions participer, annuler sa participation et consulter les participants d'un evenement.
 */
import type { RequestHandler } from 'express';

import registrationService from '../services/registration.service';

const getParamId = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  return '';
};

export const createRegistration: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { eventId } = req.body;
    const data = await registrationService.createRegistration(eventId, req.user!.id);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelRegistration: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await registrationService.cancelRegistration(getParamId(req.params.id), req.user!.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserRegistrations: RequestHandler = async (req, res, next): Promise<void> => {
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
  createRegistration,
  cancelRegistration,
  getUserRegistrations,
};
