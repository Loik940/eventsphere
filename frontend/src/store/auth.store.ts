/**
 * Store d'authentification.
 * Ce fichier gardera l'etat de connexion, l'utilisateur courant et les actions login/logout.
 */
import { create } from 'zustand'

import type { AuthUser } from '../types/auth.types'

type AuthStore = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: AuthUser) => void
  logout: () => void
  setUser: (user: AuthUser) => void
  toggleFavoriteState: (eventId: string) => void
}

const TOKEN_KEY = 'eventsphere_token'

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),

  login: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token)
    set({ token, user, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({ token: null, user: null, isAuthenticated: false })
  },

  setUser: (user) => set({ user }),

  toggleFavoriteState: (eventId) =>
    set((state) => {
      if (!state.user) return state
      const favorites = state.user.favorites || []
      const isFav = favorites.includes(eventId)
      const newFavs = isFav
        ? favorites.filter((id) => id !== eventId)
        : [...favorites, eventId]
      return { user: { ...state.user, favorites: newFavs } }
    }),
}))
