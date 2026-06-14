/**
 * Modele User.
 * Ce fichier definit la structure MongoDB d'un utilisateur avec ses informations de compte,
 * son email unique, son mot de passe hache et son avatar optionnel.
 */
import { Schema, model, type Model, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  favorites?: Types.ObjectId[];
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
