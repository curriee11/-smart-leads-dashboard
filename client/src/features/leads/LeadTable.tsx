import { Edit2, Trash2 } from 'lucide-react'

import { Button } from '../../components/Button'
import type { Lead } from '../../types/lead'
import { getSourceLabel, getStatusLabel } from './lead-options'

interface LeadTableProps {
  leads: Lead[]
  canDelete: boolean
  onEdit: (lead: Lead) => void
  onDelete: (lead: Lead) => void
}

const statusClasses: Record<Lead['status'], string> = {
  new: 'bg-sky-50 text-sky-700 ring-sky-200',
  contacted: 'bg-amber-50 text-amber-700 ring-amber-200',
  qualified: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  lost: 'bg-rose-50 text-rose-700 ring-rose-200',
}

export function LeadTable({ leads, canDelete, onEdit, onDelete }: LeadTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {leads.map((lead) => (
              <tr key={lead._id} className="bg-white">
                <td className="px-4 py-4">
                  <div className="font-semibold text-slate-950">{lead.name}</div>
                  <div className="text-slate-500">{lead.email}</div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${statusClasses[lead.status]}`}
                  >
                    {getStatusLabel(lead.status)}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-700">{getSourceLabel(lead.source)}</td>
                <td className="px-4 py-4 text-slate-700">
                  {new Intl.DateTimeFormat('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(new Date(lead.createdAt))}
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      className="min-h-9 bg-white px-3 text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
                      type="button"
                      onClick={() => onEdit(lead)}
                    >
                      <Edit2 className="h-4 w-4" aria-hidden="true" />
                      Edit
                    </Button>
                    {canDelete ? (
                      <Button
                        className="min-h-9 bg-red-600 px-3 hover:bg-red-700"
                        type="button"
                        onClick={() => onDelete(lead)}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        Delete
                      </Button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

