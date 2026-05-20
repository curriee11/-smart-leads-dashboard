import { apiClient } from '../lib/api-client'
import type { ApiResponse, PaginatedApiResponse } from '../types/api'
import type { Lead, LeadFilters, LeadFormValues } from '../types/lead'

const cleanFilters = (filters: LeadFilters) => ({
  page: filters.page,
  sort: filters.sort,
  ...(filters.status ? { status: filters.status } : {}),
  ...(filters.source ? { source: filters.source } : {}),
  ...(filters.search?.trim() ? { search: filters.search.trim() } : {}),
})

export const listLeadsRequest = async (filters: LeadFilters): Promise<PaginatedApiResponse<Lead>> => {
  const response = await apiClient.get<PaginatedApiResponse<Lead>>('/leads', {
    params: cleanFilters(filters),
  })

  return response.data
}

export const createLeadRequest = async (payload: LeadFormValues): Promise<Lead> => {
  const response = await apiClient.post<ApiResponse<Lead>>('/leads', payload)
  return response.data.data
}

export const updateLeadRequest = async ({
  id,
  payload,
}: {
  id: string
  payload: LeadFormValues
}): Promise<Lead> => {
  const response = await apiClient.patch<ApiResponse<Lead>>(`/leads/${id}`, payload)
  return response.data.data
}

export const deleteLeadRequest = async (id: string): Promise<void> => {
  await apiClient.delete(`/leads/${id}`)
}

export const getLeadsExportUrl = (filters: LeadFilters): string => {
  const params = new URLSearchParams()
  const cleanedFilters = cleanFilters(filters)

  Object.entries(cleanedFilters).forEach(([key, value]) => {
    params.set(key, String(value))
  })

  return `${apiClient.defaults.baseURL}/leads/export?${params.toString()}`
}

