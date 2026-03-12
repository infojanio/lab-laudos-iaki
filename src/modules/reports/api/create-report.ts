import { api } from '@/lib/axios'
import type { CreateReportRequest, Report } from '../types/report-types'

export async function createReport(
  payload: CreateReportRequest,
): Promise<Report> {
  const { data } = await api.post('/reports', payload)
  return data
}
