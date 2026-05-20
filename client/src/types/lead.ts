export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost'
export type LeadSource = 'website' | 'instagram' | 'referral'
export type LeadSort = 'latest' | 'oldest'

export interface Lead {
  _id: string
  name: string
  email: string
  status: LeadStatus
  source: LeadSource
  createdAt: string
  updatedAt: string
}

export interface LeadFilters {
  status?: LeadStatus
  source?: LeadSource
  search?: string
  sort: LeadSort
  page: number
}

export interface LeadFormValues {
  name: string
  email: string
  status: LeadStatus
  source: LeadSource
}
