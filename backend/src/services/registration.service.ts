/**
 * Service des inscriptions.
 * Il gerera les regles metier comme l'anti-doublon, la capacite maximale et l'annulation.
 */
import { Types } from 'mongoose';

import Event from '../models/event.model';
import Registration from '../models/registration.model';

type ServiceError = Error & {
  status?: number;
};

const ACTIVE_STATUS = 'Participe';
const CANCELLED_STATUS = 'Annulé';

const createServiceError = (message: string, status: number): ServiceError => {
  const error: ServiceError = new Error(message);
  error.status = status;

  return error;
};

const ensureObjectId = (id: string, message: string, status = 404): void => {
  if (!Types.ObjectId.isValid(id)) {
    throw createServiceError(message, status);
  }
};

const ensureCapacityAvailable = async (eventId: Types.ObjectId, maxParticipants?: number): Promise<void> => {
  if (!maxParticipants) {
    return;
  }

  const activeRegistrationsCount = await Registration.countDocuments({
    event: eventId,
    status: ACTIVE_STATUS,
  });

  if (activeRegistrationsCount >= maxParticipants) {
    throw createServiceError('Cet evenement est complet', 400);
  }
};

export const createRegistration = async (eventId: string, userId: string) => {
  ensureObjectId(eventId, 'Evenement introuvable');
  ensureObjectId(userId, 'Utilisateur invalide', 400);

  const eventObjectId = new Types.ObjectId(eventId);
  const userObjectId = new Types.ObjectId(userId);
  const event = await Event.findById(eventObjectId);

  if (!event) {
    throw createServiceError('Evenement introuvable', 404);
  }

  if (event.organizer.toString() === userId) {
    throw createServiceError('Vous ne pouvez pas vous inscrire à votre propre événement', 400);
  }

  const existingRegistration = await Registration.findOne({
    user: userObjectId,
    event: eventObjectId,
  });

  if (existingRegistration?.status === ACTIVE_STATUS) {
    throw createServiceError('Vous êtes déjà inscrit', 400);
  }

  await ensureCapacityAvailable(eventObjectId, event.maxParticipants);

  if (existingRegistration?.status === CANCELLED_STATUS) {
    existingRegistration.status = ACTIVE_STATUS;
    await existingRegistration.save();

    return existingRegistration;
  }

  const registration = new Registration({
    user: userObjectId,
    event: eventObjectId,
    status: ACTIVE_STATUS,
  });

  await registration.save();

  return registration;
};

export const cancelRegistration = async (registrationId: string, userId: string) => {
  ensureObjectId(registrationId, 'Inscription introuvable');
  ensureObjectId(userId, 'Utilisateur invalide', 400);

  const registration = await Registration.findById(registrationId);

  if (!registration) {
    throw createServiceError('Inscription introuvable', 404);
  }

  if (registration.user.toString() !== userId) {
    throw createServiceError("Vous n'êtes pas autorisé à annuler cette inscription", 403);
  }

  registration.status = CANCELLED_STATUS;
  await registration.save();

  return registration;
};

export const getUserRegistrations = async (userId: string) => {
  ensureObjectId(userId, 'Utilisateur invalide', 400);

  return Registration.find({ user: new Types.ObjectId(userId) })
    .populate('event', 'title date location category')
    .sort({ registeredAt: -1 });
};

export default {
  createRegistration,
  cancelRegistration,
  getUserRegistrations,
};
