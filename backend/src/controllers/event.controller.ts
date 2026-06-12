/**
 * Controller des evenements.
 * Il gerera les requetes HTTP liees a la creation, la lecture, la modification et la suppression des evenements.
 */
import type { RequestHandler } from 'express';

import eventService from '../services/event.service';

const getQueryString = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : undefined;
};

const getQueryNumber = (value: unknown): number | undefined => {
  const queryValue = getQueryString(value);

  if (!queryValue) {
    return undefined;
  }

  const parsedValue = Number(queryValue);

  return Number.isFinite(parsedValue) ? parsedValue : undefined;
};

const getParamId = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  return '';
};

export const getEvents: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const filters = {
      category: getQueryString(req.query.category),
      date: getQueryString(req.query.date),
      search: getQueryString(req.query.search),
      page: getQueryNumber(req.query.page),
      limit: getQueryNumber(req.query.limit),
    };

    const data = await eventService.getEvents(filters);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventById: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await eventService.getEventById(getParamId(req.params.id));

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createEvent: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await eventService.createEvent(req.body, req.user!.id);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await eventService.updateEvent(getParamId(req.params.id), req.body, req.user!.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    await eventService.deleteEvent(getParamId(req.params.id), req.user!.id);

    res.status(200).json({
      success: true,
      message: 'Événement supprimé',
    });
  } catch (error) {
    next(error);
  }
};

export const getMyEvents: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = await eventService.getEventsByOrganizer(req.user!.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
};
