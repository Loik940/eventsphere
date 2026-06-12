/**
 * Routes des evenements.
 * Ce fichier declare les endpoints publics et proteges pour consulter et gerer les evenements.
 */
import { Router } from 'express';

import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getMyEvents,
  updateEvent,
} from '../controllers/event.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validateMiddleware from '../middlewares/validate.middleware';
import { createEventSchema, updateEventSchema } from '../schemas/event.schema';

const router = Router();

// Routes publiques
router.get('/', getEvents);

// Route authentifiée — doit être AVANT /:id pour ne pas être capturée comme ID
router.get('/mine', authMiddleware, getMyEvents);

// Routes publiques avec param
router.get('/:id', getEventById);

// Routes protégées CRUD
router.post('/', authMiddleware, validateMiddleware(createEventSchema), createEvent);
router.patch('/:id', authMiddleware, validateMiddleware(updateEventSchema), updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

export default router;
