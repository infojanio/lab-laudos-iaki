import { api } from '@/lib/axios'
import type { Report } from '../types/report-types'

export async function getReport(id: string): Promise<Report> {
  const { data } = await api.get(`/reports/${id}`)
  return data
}
