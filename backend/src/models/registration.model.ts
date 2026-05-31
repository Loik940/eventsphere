/**
 * Modele Registration.
 * Il representera l'inscription d'un utilisateur a un evenement avec un statut de participation.
 */
import { Schema, model, models, Types, type Model } from 'mongoose';

export type RegistrationStatus = 'Participe' | 'Annulé';

export interface IRegistration {
  user: Types.ObjectId;
  event: Types.ObjectId;
  status: RegistrationStatus;
  registeredAt: Date;
}

const registrationSchema = new Schema<IRegistration>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  status: {
    type: String,
    enum: ['Participe', 'Annulé'],
    default: 'Participe',
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

registrationSchema.index({ user: 1, event: 1 }, { unique: true });

const Registration: Model<IRegistration> =model<IRegistration>('Registration', registrationSchema);

export default Registration;
