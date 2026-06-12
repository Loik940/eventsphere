/**
 * Fonctions API d'authentification.
 * Ce fichier regroupera les appels register, login et recuperation de l'utilisateur connecte.
 */
import apiClient from './client'
import type {
  ApiResponse,
  AuthUser,
  LoginPayload,
  LoginResult,
  RegisterPayload,
  RegisterResult,
} from '../types/auth.types'

const login = async (payload: LoginPayload): Promise<LoginResult> => {
  const response = await apiClient.post<ApiResponse<LoginResult>>('/auth/login', payload)

  return response.data.data
}

const register = async (payload: RegisterPayload): Promise<RegisterResult> => {
  const response = await apiClient.post<ApiResponse<RegisterResult>>('/auth/register', payload)

  return response.data.data
}

const getMe = async (): Promise<AuthUser> => {
  const response = await apiClient.get<ApiResponse<AuthUser>>('/auth/me')

  return response.data.data
}

const authApi = {
  login,
  register,
  getMe,
}

export default authApi
