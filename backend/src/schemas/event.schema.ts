/**
 * Schemas de validation pour les evenements.
 * Ils verifieront le titre, la date, le lieu, la categorie, la description et la capacite maximale.
 */
import { z } from 'zod';

const futureDateSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'La date fournie est invalide',
  })
  .transform((value) => new Date(value))
  .refine((date) => date > new Date(), {
    message: 'La date doit etre dans le futur',
  });

export const createEventSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caracteres'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caracteres'),
  date: futureDateSchema,
  location: z.string().min(2, 'Le lieu doit contenir au moins 2 caracteres'),
  category: z.string().min(2, 'La categorie doit contenir au moins 2 caracteres'),
  maxParticipants: z.number().positive('Le nombre maximum de participants doit etre positif').optional(),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
