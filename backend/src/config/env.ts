/**
 * Ce fichier centralisera la lecture et la validation des variables d'environnement.
 * Il permettra d'eviter d'utiliser directement process.env partout dans le backend.
 */
import * as dotenv from 'dotenv';

dotenv.config();

const getRequiredEnv = (key: 'MONGODB_URI' | 'JWT_SECRET'): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Variable d'environnement obligatoire manquante : ${key}`);
  }

  return value;
};

const getPort = (): number => {
  const port = Number(process.env.PORT ?? 5000);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('PORT doit etre un entier positif');
  }

  return port;
};

export const config = {
  PORT: getPort(),
  MONGODB_URI: getRequiredEnv('MONGODB_URI'),
  JWT_SECRET: getRequiredEnv('JWT_SECRET'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  SMTP_HOST: process.env.SMTP_HOST ?? '',
  SMTP_PORT: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  SMTP_USER: process.env.SMTP_USER ?? '',
  SMTP_PASS: process.env.SMTP_PASS ?? '',
  EMAIL_FROM: process.env.EMAIL_FROM ?? 'noreply@eventsphere.com',
};
