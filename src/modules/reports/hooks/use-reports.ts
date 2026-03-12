import { useQuery } from '@tanstack/react-query'
import { getReports } from '../api/get-reports'

export function useReports(page = 1) {
  return useQuery({
    queryKey: ['reports', page],
    queryFn: () => getReports(page),
  })
}
