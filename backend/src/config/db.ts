/**
 * Ce fichier gerera la connexion a MongoDB avec Mongoose.
 * Il sera appele au demarrage du serveur avant d'accepter les requetes API.
 */
import mongoose from 'mongoose';
import { config } from './env';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log(`MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error('Erreur connexion MongoDB :', error);
    process.exit(1);
  }
};

export default connectDB;