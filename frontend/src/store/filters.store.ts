/**
 * Store des filtres d'evenements.
 * Ce fichier gardera la recherche, la categorie, la periode et les options de pagination courantes.
 */
import { create } from 'zustand'

import type { EventFilters } from '../types/event.types'

type FiltersStore = {
  filters: EventFilters
  setFilter: <K extends keyof EventFilters>(key: K, value: EventFilters[K]) => void
  resetFilters: () => void
}

const defaultFilters: EventFilters = {
  page: 1,
  limit: 9,
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  filters: defaultFilters,

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
        // Revenir à la page 1 quand un filtre change (sauf si c'est le filtre page lui-même)
        ...(key !== 'page' ? { page: 1 } : {}),
      },
    })),

  resetFilters: () => set({ filters: defaultFilters }),
}))
