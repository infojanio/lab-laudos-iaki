import { api } from '@/lib/axios'
import type { LoginRequest, SessionResponse } from '../types/auth-types'

export async function login(payload: LoginRequest): Promise<SessionResponse> {
  const { data } = await api.post('/sessions', payload)
  return data
}
