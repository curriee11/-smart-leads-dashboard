export interface ApiResponse<TData> {
  success: boolean
  message: string
  data: TData
}

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Array<{
    field: string
    message: string
  }>
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginatedApiResponse<TData> extends ApiResponse<TData[]> {
  pagination: PaginationMeta
}
