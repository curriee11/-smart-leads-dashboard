import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { loginRequest } from '../api/auth-api'
import { Button } from '../components/Button'
import { FormField } from '../components/FormField'
import { loginFormSchema, type LoginFormValues } from '../features/auth/auth-schemas'
import { useAuth } from '../features/auth/use-auth'
import { getApiErrorMessage } from '../hooks/use-api-error'

export function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, setAuth } = useAuth()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (payload) => {
      setAuth(payload)
      navigate('/dashboard', { replace: true })
    },
  })

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <main className="grid min-h-screen bg-slate-100 px-4 py-8 text-slate-950">
      <section className="mx-auto grid w-full max-w-md content-center gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
            Smart Leads Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold">Sign in</h1>
        </div>

        <form
          className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))}
        >
          <FormField
            label="Email"
            type="email"
            autoComplete="email"
            error={form.formState.errors.email?.message}
            {...form.register('email')}
          />
          <FormField
            label="Password"
            type="password"
            autoComplete="current-password"
            error={form.formState.errors.password?.message}
            {...form.register('password')}
          />

          {loginMutation.isError ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {getApiErrorMessage(loginMutation.error)}
            </p>
          ) : null}

          <Button type="submit" isLoading={loginMutation.isPending}>
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in
          </Button>

          <p className="text-center text-sm text-slate-600">
            New here?{' '}
            <Link className="font-semibold text-cyan-700 hover:text-cyan-900" to="/register">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
