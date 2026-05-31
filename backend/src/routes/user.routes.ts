/**
 * Routes utilisateur.
 * Ce fichier expose les endpoints lies au profil du compte connecte.
 */
import { Router } from 'express';

import { getProfile, updateProfile } from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfile);

export default router;
