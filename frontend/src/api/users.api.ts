import apiClient from './client'
import type { Event } from '../types/event.types'

export const toggleFavorite = async (eventId: string): Promise<string[]> => {
  const { data } = await apiClient.post(`/users/favorites/${eventId}`)
  return data.data
}

export const getFavorites = async (): Promise<Event[]> => {
  const { data } = await apiClient.get('/users/favorites')
  return data.data
}

export default {
  toggleFavorite,
  getFavorites,
}
