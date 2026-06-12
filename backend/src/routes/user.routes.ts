/**
 * Routes utilisateur.
 * Ce fichier expose les endpoints lies au profil du compte connecte.
 */
import { Router } from 'express';

import { getProfile, getUserHistory, updateProfile } from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authMiddleware, getProfile);
router.patch('/me', authMiddleware, updateProfile);
router.get('/me/history', authMiddleware, getUserHistory);

export default router;
