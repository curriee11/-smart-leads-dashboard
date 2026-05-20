import { Download, Search } from 'lucide-react'

import { Button } from '../../components/Button'
import type { LeadFilters as LeadFiltersType, LeadSource, LeadStatus } from '../../types/lead'
import { leadSources, leadStatuses } from './lead-options'

interface LeadFiltersProps {
  filters: LeadFiltersType
  searchValue: string
  onFilterChange: (filters: Partial<LeadFiltersType>) => void
  onSearchChange: (value: string) => void
  onExport: () => void
}

export function LeadFilters({
  filters,
  searchValue,
  onFilterChange,
  onSearchChange,
  onExport,
}: LeadFiltersProps) {
  return (
    <section className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="grid gap-1.5 text-sm font-medium text-slate-700">
          Search
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="min-h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:ring-4 focus:ring-cyan-100"
              placeholder="Name or email"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-slate-700">
          Status
          <select
            className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-950 outline-none transition focus:border-cyan-700 focus:ring-4 focus:ring-cyan-100"
            value={filters.status ?? ''}
            onChange={(event) =>
              onFilterChange({ status: (event.target.value || undefined) as LeadStatus | undefined })
            }
          >
            <option value="">All statuses</option>
            {leadStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-slate-700">
          Source
          <select
            className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-950 outline-none transition focus:border-cyan-700 focus:ring-4 focus:ring-cyan-100"
            value={filters.source ?? ''}
            onChange={(event) =>
              onFilterChange({ source: (event.target.value || undefined) as LeadSource | undefined })
            }
          >
            <option value="">All sources</option>
            {leadSources.map((source) => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-slate-700">
          Sort
          <select
            className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-950 outline-none transition focus:border-cyan-700 focus:ring-4 focus:ring-cyan-100"
            value={filters.sort}
            onChange={(event) => onFilterChange({ sort: event.target.value as LeadFiltersType['sort'] })}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </div>

      <Button className="bg-slate-900 hover:bg-slate-700" type="button" onClick={onExport}>
        <Download className="h-4 w-4" aria-hidden="true" />
        Export CSV
      </Button>
    </section>
  )
}

