export interface ApiResponse<TData> {
  success: boolean
  message: string
  data: TData
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

