import { useQuery } from '@tanstack/react-query'
import { getReport } from '../api/get-report'

export function useReport(id: string) {
  return useQuery({
    queryKey: ['report', id],
    queryFn: () => getReport(id),
    enabled: !!id,
  })
}
