/**
 * Types des evenements.
 * Ce fichier definira les interfaces TypeScript pour un evenement, ses filtres et ses formulaires.
 */

export type EventOrganizer = {
  _id: string
  name: string
  email: string
}

export type Event = {
  _id: string
  title: string
  description: string
  date: string
  location: string
  category: string
  imageUrl?: string
  maxParticipants?: number
  organizer: EventOrganizer
  createdAt: string
  updatedAt: string
}

export type EventFilters = {
  search?: string
  category?: string
  period?: 'upcoming' | 'past'
  page?: number
  limit?: number
}

export type PaginatedEvents = {
  events: Event[]
  total: number
  page: number
  totalPages: number
}

export type CreateEventPayload = {
  title: string
  description: string
  date: string
  location: string
  category: string
  imageUrl?: string
  maxParticipants?: number
}

export type UpdateEventPayload = Partial<CreateEventPayload>
