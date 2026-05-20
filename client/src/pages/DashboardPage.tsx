import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AlertCircle, LogOut, Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '../components/Button'
import {
  createLeadRequest,
  deleteLeadRequest,
  getLeadsExportUrl,
  listLeadsRequest,
  updateLeadRequest,
} from '../api/lead-api'
import { useAuth } from '../features/auth/auth-context'
import { LeadFilters } from '../features/leads/LeadFilters'
import { LeadForm } from '../features/leads/LeadForm'
import { LeadTable } from '../features/leads/LeadTable'
import { Pagination } from '../features/leads/Pagination'
import { getApiErrorMessage } from '../hooks/use-api-error'
import { useDebounce } from '../hooks/use-debounce'
import type { Lead, LeadFilters as LeadFiltersType, LeadFormValues } from '../types/lead'

export function DashboardPage() {
  const { user, logout } = useAuth()
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState<LeadFiltersType>({
    sort: 'latest',
    page: 1,
  })
  const [searchValue, setSearchValue] = useState('')
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const debouncedSearch = useDebounce(searchValue, 450)
  const canDelete = user?.role === 'admin'

  useEffect(() => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      search: debouncedSearch,
      page: 1,
    }))
  }, [debouncedSearch])

  const queryFilters = useMemo(() => filters, [filters])

  const leadsQuery = useQuery({
    queryKey: ['leads', queryFilters],
    queryFn: () => listLeadsRequest(queryFilters),
  })

  const invalidateLeads = async () => {
    await queryClient.invalidateQueries({ queryKey: ['leads'] })
  }

  const createLeadMutation = useMutation({
    mutationFn: createLeadRequest,
    onSuccess: async () => {
      setFormError(null)
      await invalidateLeads()
    },
    onError: (error) => setFormError(getApiErrorMessage(error)),
  })

  const updateLeadMutation = useMutation({
    mutationFn: updateLeadRequest,
    onSuccess: async () => {
      setFormError(null)
      setEditingLead(null)
      await invalidateLeads()
    },
    onError: (error) => setFormError(getApiErrorMessage(error)),
  })

  const deleteLeadMutation = useMutation({
    mutationFn: deleteLeadRequest,
    onSuccess: invalidateLeads,
  })

  const handleFilterChange = (updatedFilters: Partial<LeadFiltersType>) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      ...updatedFilters,
      page: updatedFilters.page ?? 1,
    }))
  }

  const handleLeadSubmit = (values: LeadFormValues) => {
    setFormError(null)

    if (editingLead) {
      updateLeadMutation.mutate({
        id: editingLead._id,
        payload: values,
      })
      return
    }

    createLeadMutation.mutate(values)
  }

  const handleDelete = (lead: Lead) => {
    const shouldDelete = window.confirm(`Delete ${lead.name}? This action cannot be undone.`)

    if (shouldDelete) {
      deleteLeadMutation.mutate(lead._id)
    }
  }

  const handleExport = () => {
    const token = localStorage.getItem('smart-leads-token')
    const exportUrl = getLeadsExportUrl(filters)

    fetch(exportUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('CSV export failed')
        }

        return response.blob()
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = 'leads.csv'
        anchor.click()
        window.URL.revokeObjectURL(url)
      })
      .catch((error: unknown) => {
        setFormError(getApiErrorMessage(error))
      })
  }

  const isFormSubmitting = createLeadMutation.isPending || updateLeadMutation.isPending

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

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Leads</h2>
            <p className="mt-1 text-sm text-slate-600">
              Track lead status, source, and follow-up progress from one workspace.
            </p>
          </div>
          <Button type="button" onClick={() => setEditingLead(null)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New lead
          </Button>
        </div>

        <LeadFilters
          filters={filters}
          searchValue={searchValue}
          onFilterChange={handleFilterChange}
          onSearchChange={setSearchValue}
          onExport={handleExport}
        />

        {formError ? (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {formError}
          </div>
        ) : null}

        <LeadForm
          lead={editingLead}
          isSubmitting={isFormSubmitting}
          onSubmit={handleLeadSubmit}
          onCancelEdit={() => setEditingLead(null)}
        />

        {leadsQuery.isLoading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm font-medium text-slate-600 shadow-sm">
            Loading leads...
          </div>
        ) : null}

        {leadsQuery.isError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {getApiErrorMessage(leadsQuery.error)}
          </div>
        ) : null}

        {leadsQuery.data && leadsQuery.data.data.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-base font-semibold">No leads found</h3>
            <p className="mt-1 text-sm text-slate-600">
              Adjust filters or create a new lead to start filling the pipeline.
            </p>
          </div>
        ) : null}

        {leadsQuery.data && leadsQuery.data.data.length > 0 ? (
          <>
            <LeadTable
              leads={leadsQuery.data.data}
              canDelete={canDelete}
              onEdit={setEditingLead}
              onDelete={handleDelete}
            />
            <Pagination pagination={leadsQuery.data.pagination} onPageChange={(page) => handleFilterChange({ page })} />
          </>
        ) : null}
      </section>
    </main>
  )
}
