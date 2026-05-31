/**
 * Routes d'authentification.
 * Ce fichier expose les endpoints pour creer un compte et connecter un utilisateur.
 */
import { Router } from 'express';

import { login, register } from '../controllers/auth.controller';
import validateMiddleware from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', validateMiddleware(registerSchema), register);
router.post('/login', validateMiddleware(loginSchema), login);

export default router;
