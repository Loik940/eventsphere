/**
 * Fonctions API des evenements.
 * Ce fichier regroupera les appels pour lister, creer, modifier, supprimer et consulter les evenements.
 */
import type { ApiResponse } from '../types/auth.types'
import type {
  CreateEventPayload,
  Event,
  EventFilters,
  PaginatedEvents,
  UpdateEventPayload,
} from '../types/event.types'
import apiClient from './client'

const getEvents = async (filters: EventFilters): Promise<PaginatedEvents> => {
  const response = await apiClient.get<ApiResponse<PaginatedEvents>>('/events', {
    params: filters,
  })

  return response.data.data
}

const getEventById = async (id: string): Promise<Event> => {
  const response = await apiClient.get<ApiResponse<Event>>(`/events/${id}`)

  return response.data.data
}

const getMyEvents = async (): Promise<Event[]> => {
  const response = await apiClient.get<ApiResponse<Event[]>>('/events/mine')

  return response.data.data
}

const createEvent = async (payload: CreateEventPayload): Promise<Event> => {
  const response = await apiClient.post<ApiResponse<Event>>('/events', payload)

  return response.data.data
}

const updateEvent = async (id: string, payload: UpdateEventPayload): Promise<Event> => {
  const response = await apiClient.patch<ApiResponse<Event>>(`/events/${id}`, payload)

  return response.data.data
}

const deleteEvent = async (id: string): Promise<void> => {
  await apiClient.delete(`/events/${id}`)
}

const eventsApi = {
  getEvents,
  getEventById,
  getMyEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}

export default eventsApi
