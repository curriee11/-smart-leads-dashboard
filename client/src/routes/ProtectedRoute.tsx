import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../features/auth/auth-context'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 px-4 text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm font-medium shadow-sm">
          Loading session...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

