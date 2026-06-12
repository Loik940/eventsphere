/**
 * Service des evenements.
 * Il contiendra la logique metier pour creer, rechercher, modifier, supprimer et compter les participants.
 */
import { Types, type QueryFilter } from 'mongoose';

import Event, { type IEvent } from '../models/event.model';
import type { CreateEventInput, UpdateEventInput } from '../schemas/event.schema';

type ServiceError = Error & {
  status?: number;
};

type EventFilters = {
  category?: string;
  date?: string;
  search?: string;
  page?: number;
  limit?: number;
};

const createServiceError = (message: string, status: number): ServiceError => {
  const error: ServiceError = new Error(message);
  error.status = status;

  return error;
};

const getValidPage = (page?: number): number => {
  if (!page || page < 1) {
    return 1;
  }

  return page;
};

const getValidLimit = (limit?: number): number => {
  if (!limit || limit < 1) {
    return 10;
  }

  return limit;
};

const getStartOfDay = (date: string): Date => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    throw createServiceError('Date de filtre invalide', 400);
  }

  parsedDate.setHours(0, 0, 0, 0);

  return parsedDate;
};

const ensureObjectId = (id: string, message: string, status = 404): void => {
  if (!Types.ObjectId.isValid(id)) {
    throw createServiceError(message, status);
  }
};

export const getEvents = async (filters: EventFilters) => {
  const query: QueryFilter<IEvent> = {};
  const page = getValidPage(filters.page);
  const limit = getValidLimit(filters.limit);
  const skip = (page - 1) * limit;

  if (filters.search) {
    query.title = {
      $regex: filters.search,
      $options: 'i',
    };
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.date) {
    query.date = {
      $gte: getStartOfDay(filters.date),
    };
  }

  const [events, total] = await Promise.all([
    Event.find(query)
      .populate('organizer', 'name email')
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit),
    Event.countDocuments(query),
  ]);

  return {
    events,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getEventById = async (id: string) => {
  ensureObjectId(id, 'Evenement introuvable');

  const event = await Event.findById(id).populate('organizer', 'name email');

  if (!event) {
    throw createServiceError('Evenement introuvable', 404);
  }

  return event;
};

export const createEvent = async (data: CreateEventInput, organizerId: string) => {
  ensureObjectId(organizerId, 'Organisateur invalide', 400);

  const event = new Event({
    ...data,
    organizer: new Types.ObjectId(organizerId),
  });

  await event.save();

  return event;
};

export const updateEvent = async (id: string, data: UpdateEventInput, userId: string) => {
  ensureObjectId(id, 'Evenement introuvable');

  const event = await Event.findById(id);

  if (!event) {
    throw createServiceError('Evenement introuvable', 404);
  }

  if (event.organizer.toString() !== userId) {
    throw createServiceError("Vous n'etes pas autorise a modifier cet evenement", 403);
  }

  event.set(data);
  await event.save();

  return event.populate('organizer', 'name email');
};

export const deleteEvent = async (id: string, userId: string): Promise<void> => {
  ensureObjectId(id, 'Evenement introuvable');

  const event = await Event.findById(id);

  if (!event) {
    throw createServiceError('Evenement introuvable', 404);
  }

  if (event.organizer.toString() !== userId) {
    throw createServiceError("Vous n'etes pas autorise a supprimer cet evenement", 403);
  }

  await event.deleteOne();
};

export const getEventsByOrganizer = async (userId: string) => {
  ensureObjectId(userId, 'Utilisateur invalide', 400);

  return Event.find({ organizer: new Types.ObjectId(userId) })
    .populate('organizer', 'name email')
    .sort({ date: 1 });
};

export default {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByOrganizer,
};
