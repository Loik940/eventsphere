/**
 * Modele Event.
 * Il definira la structure MongoDB d'un evenement cree par un organisateur.
 */
import { Schema, model, models, Types, type Model } from 'mongoose';

export interface IEvent {
    title: string;
    description: string;
    date: Date;
    location: string;
    category: string;
    maxParticipants?: number;
    organizer: Types.ObjectId;
    createdAt: Date;
}

const eventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    maxParticipants: {
        type: Number,
        required: false,
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Event: Model<IEvent> = model<IEvent>('Event', eventSchema);

export default Event;
