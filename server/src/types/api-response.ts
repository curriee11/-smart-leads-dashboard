export interface ApiResponse<TData> {
  success: boolean;
  message: string;
  data?: TData;
}

export interface PaginatedResponse<TData> extends ApiResponse<TData[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

