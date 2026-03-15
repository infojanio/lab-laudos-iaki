import { useQuery } from '@tanstack/react-query'
import { parameterService } from '@/services/parameterService'
import { queryKeys } from '@/lib/react-query/querykeys'

export function useParameter(id: string) {
  return useQuery({
    queryKey: queryKeys.parameter(id),
    queryFn: () => parameterService.getById(id),
    enabled: !!id,
  })
}
