import type { LeadSource, LeadStatus } from '../../types/lead'

export const leadStatuses: Array<{ label: string; value: LeadStatus }> = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Lost', value: 'lost' },
]

export const leadSources: Array<{ label: string; value: LeadSource }> = [
  { label: 'Website', value: 'website' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Referral', value: 'referral' },
]

export const getStatusLabel = (status: LeadStatus) => {
  return leadStatuses.find((item) => item.value === status)?.label ?? status
}

export const getSourceLabel = (source: LeadSource) => {
  return leadSources.find((item) => item.value === source)?.label ?? source
}

