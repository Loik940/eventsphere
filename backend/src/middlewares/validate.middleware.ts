/**
 * Middleware de validation.
 * Il utilisera les schemas Zod pour verifier les body, params et query avant d'entrer dans les controllers.
 */
import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

const validateMiddleware = (schema: ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        champ: issue.path.join('.'),
        message: issue.message,
      }));

      res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors,
      });
      return;
    }

    req.body = result.data;
    next();
  };
};

export default validateMiddleware;
