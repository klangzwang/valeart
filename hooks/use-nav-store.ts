import { create } from 'zustand'

interface NavState {
  isOpen: boolean
  toggle: () => void
  close: () => void
  open: () => void
}

export const useNavStore = create<NavState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}))