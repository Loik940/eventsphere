/**
 * Middleware d'authentification.
 * Il verifiera le token JWT et attachera l'utilisateur connecte a la requete avant les routes protegees.
 */
import type { RequestHandler } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import { config } from '../config/env';

type AuthPayload = JwtPayload & {
  id?: unknown;
  email?: unknown;
};

const unauthorizedResponse = {
  success: false,
  message: 'Vous n\'êtes pas autorisé',
};

const authMiddleware: RequestHandler = (req, res, next) => {
  const authorization = req.header('Authorization');

  if (!authorization?.startsWith('Bearer ')) {
    res.status(401).json(unauthorizedResponse);
    return;
  }

  const token = authorization.replace('Bearer ', '').trim();

  if (!token) {
    res.status(401).json(unauthorizedResponse);
    return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (typeof decoded === 'string') {
      res.status(401).json(unauthorizedResponse);
      return;
    }

    const payload: AuthPayload = decoded;

    if (typeof payload.id !== 'string' || typeof payload.email !== 'string') {
      res.status(401).json(unauthorizedResponse);
      return;
    }

    req.user = {
      id: payload.id,
      email: payload.email,
    };

    next();
  } catch (_error) {
    res.status(401).json(unauthorizedResponse);
  }
};

export default authMiddleware;
