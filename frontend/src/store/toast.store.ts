import { create } from 'zustand'

import type { ToastType } from '../components/ui/Toast'

type ToastMessage = {
  id: string
  message: string
  type: ToastType
  duration?: number
}

type ToastStore = {
  toasts: ToastMessage[]
  addToast: (message: string, type: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

let idCounter = 0

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type, duration) => {
    const id = String(++idCounter)
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }))
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))
