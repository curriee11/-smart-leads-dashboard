import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { SelectField } from '../../components/SelectField'
import type { Lead, LeadFormValues } from '../../types/lead'
import { leadSources, leadStatuses } from './lead-options'
import { leadFormSchema, type LeadFormSchemaValues } from './lead-schema'

interface LeadFormProps {
  lead?: Lead | null
  isSubmitting: boolean
  onSubmit: (values: LeadFormValues) => void
  onCancelEdit: () => void
}

const defaultValues: LeadFormValues = {
  name: '',
  email: '',
  status: 'new',
  source: 'website',
}

export function LeadForm({ lead, isSubmitting, onSubmit, onCancelEdit }: LeadFormProps) {
  const form = useForm<LeadFormSchemaValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues,
  })

  useEffect(() => {
    if (lead) {
      form.reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
      })
      return
    }

    form.reset(defaultValues)
  }, [form, lead])

  return (
    <form
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      onSubmit={form.handleSubmit((values) => onSubmit(values))}
    >
      <div>
        <h2 className="text-lg font-semibold">{lead ? 'Edit lead' : 'Create lead'}</h2>
        <p className="mt-1 text-sm text-slate-600">
          {lead ? 'Update lead information and status.' : 'Add a new lead to the sales pipeline.'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Name" error={form.formState.errors.name?.message} {...form.register('name')} />
        <FormField
          label="Email"
          type="email"
          error={form.formState.errors.email?.message}
          {...form.register('email')}
        />
        <SelectField label="Status" error={form.formState.errors.status?.message} {...form.register('status')}>
          {leadStatuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </SelectField>
        <SelectField label="Source" error={form.formState.errors.source?.message} {...form.register('source')}>
          {leadSources.map((source) => (
            <option key={source.value} value={source.value}>
              {source.label}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit" isLoading={isSubmitting}>
          <Save className="h-4 w-4" aria-hidden="true" />
          {lead ? 'Save changes' : 'Create lead'}
        </Button>
        {lead ? (
          <Button
            className="bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
            type="button"
            onClick={onCancelEdit}
          >
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  )
}

