import axios from 'axios'

import type { ApiErrorResponse } from '../types/api'

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data.message ?? 'Something went wrong'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong'
}

