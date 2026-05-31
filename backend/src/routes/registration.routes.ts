/**
 * Routes des inscriptions.
 * Ce fichier declare les endpoints pour participer, annuler et recuperer les inscriptions utilisateur.
 */
import { Router } from 'express';

import {
  cancelRegistration,
  createRegistration,
  getUserRegistrations,
} from '../controllers/registration.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validateMiddleware from '../middlewares/validate.middleware';
import { createRegistrationSchema } from '../schemas/registration.schema';

const router = Router();

router.get('/me', authMiddleware, getUserRegistrations);
router.post('/', authMiddleware, validateMiddleware(createRegistrationSchema), createRegistration);
router.patch('/:id/cancel', authMiddleware, cancelRegistration);

export default router;
