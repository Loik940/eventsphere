/**
 * Types d'authentification.
 * Ce fichier definira les formes TypeScript des utilisateurs, tokens et payloads login/register.
 */
export type AuthUser = {
  id: string
  name: string
  email: string
  favorites?: string[]
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type UpdatePasswordPayload = {
  currentPassword: string
  newPassword: string
}

export type LoginResult = {
  token: string
  user: AuthUser
}

export type RegisterResult = AuthUser

export type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string
}
