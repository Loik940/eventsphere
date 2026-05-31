/**
 * Schemas de validation pour les inscriptions.
 * Ils verifieront les identifiants d'evenement et les actions de participation ou d'annulation.
 */
import { z } from 'zod';

const mongoIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Identifiant MongoDB invalide');

export const createRegistrationSchema = z.object({
  eventId: mongoIdSchema,
});

export const updateRegistrationSchema = z.object({
  status: z.enum(['Participe', 'Annulé'], 'Statut de participation invalide'),
});

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;
export type UpdateRegistrationInput = z.infer<typeof updateRegistrationSchema>;
