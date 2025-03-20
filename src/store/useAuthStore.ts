//TODO: I will implement this later
// import { User } from '@supabase/supabase-js'
// import { create } from 'zustand'

// type AuthState = {
//   user: User | null
//   isAuthenticated: boolean
// }

// type AuthActions = {
//   login: (user: User) => void
//   logout: () => void
// }

// const useAuthStore = create<AuthState & AuthActions>((set) => ({
//   user: null,
//   isAuthenticated: false,
//   login: (user: User) => set({ user, isAuthenticated: true }),
//   logout: () => set({ user: null, isAuthenticated: false }),
// }))

// export default useAuthStore

//Example of simple auth store to check if user is logged in

import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  login: Callback
  logout: Callback
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('user'),
  login: () => {
    localStorage.setItem('user', 'true')
    set({ isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('user')
    set({ isAuthenticated: false })
  },
}))

export default useAuthStore
