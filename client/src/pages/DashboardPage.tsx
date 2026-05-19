import { LogOut } from 'lucide-react'

import { Button } from '../components/Button'
import { useAuth } from '../features/auth/auth-context'

export function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
              Smart Leads Dashboard
            </p>
            <h1 className="text-2xl font-bold">Lead Management</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{user?.name}</span>
              <span className="mx-2 text-slate-300">|</span>
              <span className="capitalize">{user?.role}</span>
            </div>
            <Button className="bg-slate-900 hover:bg-slate-700" type="button" onClick={logout}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Leads workspace coming next</h2>
          <p className="mt-2 text-sm text-slate-600">
            Auth is ready. The next step will add lead filters, table, forms, pagination, and CSV export.
          </p>
        </div>
      </section>
    </main>
  )
}

