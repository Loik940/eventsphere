/**
 * Routes d'authentification.
 * Ce fichier expose les endpoints pour creer un compte et connecter un utilisateur.
 */
import { Router } from 'express';
import { getMe, login, register, forgotPassword, resetPassword, updatePassword } from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validateMiddleware from '../middlewares/validate.middleware';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updatePasswordSchema,
} from '../schemas/auth.schema';

const router = Router();

router.post('/register', validateMiddleware(registerSchema), register);
router.post('/login', validateMiddleware(loginSchema), login);
router.post('/forgot-password', validateMiddleware(forgotPasswordSchema), forgotPassword);
router.put('/reset-password/:token', validateMiddleware(resetPasswordSchema), resetPassword);

// Routes protegees (necessitent un JWT)
router.get('/me', authMiddleware, getMe);
router.put('/update-password', authMiddleware, validateMiddleware(updatePasswordSchema), updatePassword);

export default router;
