/**
 * Schemas de validation pour l'authentification.
 * Ils verifieront les donnees d'inscription, de connexion et les champs sensibles avant traitement.
 */
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caracteres'),
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caracteres'),
});

export const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(1, 'Le mot de passe est obligatoire'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Adresse email invalide'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caracteres'),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Le mot de passe actuel est obligatoire'),
  newPassword: z.string().min(6, 'Le nouveau mot de passe doit contenir au moins 6 caracteres'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
