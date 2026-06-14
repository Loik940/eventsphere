/**
 * Types des inscriptions.
 * Ce fichier definira les interfaces TypeScript pour une participation, son statut et son historique.
 */

export type RegistrationStatus = 'Participe' | 'Annulé'

export type RegistrationEvent = {
  _id: string
  title: string
  date: string
  location: string
  category: string
  imageUrl?: string
}

export type Registration = {
  _id: string
  user: string
  event: RegistrationEvent
  status: RegistrationStatus
  registeredAt: string
  cancelledAt?: string
  createdAt: string
  updatedAt: string
}
