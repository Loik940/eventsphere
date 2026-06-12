/**
 * Fonctions API des inscriptions.
 * Ce fichier regroupera les appels pour participer a un evenement, annuler et consulter ses inscriptions.
 */
import type { ApiResponse } from '../types/auth.types'
import type { Registration } from '../types/registration.types'
import apiClient from './client'

const register = async (eventId: string): Promise<Registration> => {
  const response = await apiClient.post<ApiResponse<Registration>>(
    '/registrations',
    { eventId }
  )

  return response.data.data
}

const cancel = async (registrationId: string): Promise<Registration> => {
  const response = await apiClient.patch<ApiResponse<Registration>>(
    `/registrations/${registrationId}/cancel`,
  )

  return response.data.data
}

const getMyRegistrations = async (): Promise<Registration[]> => {
  const response = await apiClient.get<ApiResponse<Registration[]>>('/registrations/me')

  return response.data.data
}

const registrationsApi = {
  register,
  cancel,
  getMyRegistrations,
}

export default registrationsApi
