/**
 * Point d'entree du backend.
 * Ce fichier configure Express, branche les routes API, connecte MongoDB,
 * puis demarre le serveur HTTP de l'application EventSphere.
 */
import express, { type Request, type Response } from 'express';
import cors from 'cors';

import { config } from './config/env';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';
import registrationRoutes from './routes/registration.routes';
import userRoutes from './routes/user.routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'EventSphere API a demarre avec succes',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware);

const start = async (): Promise<void> => {
  await connectDB();

  app.listen(config.PORT, () => {
    console.log(`Serveur demarre sur http://localhost:${config.PORT}`);
  });
};

start();
