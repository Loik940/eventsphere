/**
 * Middleware centralise de gestion des erreurs.
 * Il transformera les erreurs techniques ou metier en reponses JSON coherentes pour le frontend.
 */
import type { ErrorRequestHandler } from 'express';

type HttpError = Error & {
  status?: number;
};

const errorMiddleware: ErrorRequestHandler = (err: HttpError, _req, res, _next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur serveur interne',
  });
};

export default errorMiddleware;
