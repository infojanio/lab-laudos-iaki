import { api } from '@/lib/axios'
import type { PaginatedReportsResponse } from '../types/report-types'

export async function getReports(page = 1): Promise<PaginatedReportsResponse> {
  const { data } = await api.get(`/reports?page=${page}`)
  return data
}
