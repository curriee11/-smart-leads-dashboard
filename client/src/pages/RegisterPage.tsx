import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { UserPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { registerRequest } from '../api/auth-api'
import { Button } from '../components/Button'
import { FormField } from '../components/FormField'
import { SelectField } from '../components/SelectField'
import { useAuth } from '../features/auth/auth-context'
import { registerFormSchema, type RegisterFormValues } from '../features/auth/auth-schemas'
import { getApiErrorMessage } from '../hooks/use-api-error'

export function RegisterPage() {
  const navigate = useNavigate()
  const { isAuthenticated, setAuth } = useAuth()
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'sales',
    },
  })

  const registerMutation = useMutation({
    mutationFn: registerRequest,
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
          <h1 className="mt-2 text-3xl font-bold">Create account</h1>
        </div>

        <form
          className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={form.handleSubmit((values) => registerMutation.mutate(values))}
        >
          <FormField
            label="Name"
            autoComplete="name"
            error={form.formState.errors.name?.message}
            {...form.register('name')}
          />
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
            autoComplete="new-password"
            error={form.formState.errors.password?.message}
            {...form.register('password')}
          />
          <SelectField label="Role" error={form.formState.errors.role?.message} {...form.register('role')}>
            <option value="sales">Sales User</option>
            <option value="admin">Admin</option>
          </SelectField>

          {registerMutation.isError ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {getApiErrorMessage(registerMutation.error)}
            </p>
          ) : null}

          <Button type="submit" isLoading={registerMutation.isPending}>
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Create account
          </Button>

          <p className="text-center text-sm text-slate-600">
            Already registered?{' '}
            <Link className="font-semibold text-cyan-700 hover:text-cyan-900" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}

