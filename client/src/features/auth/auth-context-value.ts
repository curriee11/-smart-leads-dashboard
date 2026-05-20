import { createContext } from 'react'

import type { AuthPayload, AuthUser } from '../../types/auth'

export const TOKEN_KEY = 'smart-leads-token'

export interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isAuthLoading: boolean
  setAuth: (payload: AuthPayload) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

