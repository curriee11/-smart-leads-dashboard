import { apiClient } from '../lib/api-client'
import type { ApiResponse } from '../types/api'
import type { AuthPayload, UserRole } from '../types/auth'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  name: string
  role: UserRole
}

export const loginRequest = async (payload: LoginRequest): Promise<AuthPayload> => {
  const response = await apiClient.post<ApiResponse<AuthPayload>>('/auth/login', payload)
  return response.data.data
}

export const registerRequest = async (payload: RegisterRequest): Promise<AuthPayload> => {
  const response = await apiClient.post<ApiResponse<AuthPayload>>('/auth/register', payload)
  return response.data.data
}

export const meRequest = async (): Promise<AuthPayload['user']> => {
  const response = await apiClient.get<ApiResponse<{ user: AuthPayload['user'] }>>('/auth/me')
  return response.data.data.user
}

