import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '../../components/Button'
import type { PaginationMeta } from '../../types/api'

interface PaginationProps {
  pagination: PaginationMeta
  onPageChange: (page: number) => void
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p>
        Page <span className="font-semibold text-slate-950">{pagination.page}</span> of{' '}
        <span className="font-semibold text-slate-950">{Math.max(pagination.totalPages, 1)}</span>
        <span className="ml-2">({pagination.total} leads)</span>
      </p>
      <div className="flex gap-2">
        <Button
          className="min-h-9 bg-white px-3 text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
          type="button"
          disabled={!pagination.hasPreviousPage}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </Button>
        <Button
          className="min-h-9 bg-white px-3 text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
          type="button"
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

