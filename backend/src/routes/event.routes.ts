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
  updateEvent,
} from '../controllers/event.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validateMiddleware from '../middlewares/validate.middleware';
import { createEventSchema, updateEventSchema } from '../schemas/event.schema';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authMiddleware, validateMiddleware(createEventSchema), createEvent);
router.put('/:id', authMiddleware, validateMiddleware(updateEventSchema), updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

export default router;
