import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'
import { mockUsers } from '../data/mockData'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))

        const user = mockUsers.find(u => u.email === email)
        if (user && password === 'password123') {
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },
      signup: async (name: string, email: string, _password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))

        const newUser: User = {
          id: Math.random().toString(36).substring(7),
          name,
          email,
          role: 'student',
          enrolledCourses: [],
          createdAt: new Date()
        }

        set({ user: newUser, isAuthenticated: true })
        return true
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
