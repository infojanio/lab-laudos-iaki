import { useQuery } from '@tanstack/react-query'
import { parameterService } from '@/services/parameterService'
import { ReportSection } from '@/types/parameter'
import { queryKeys } from '@/lib/react-query/querykeys'

interface UseParametersParams {
  section?: ReportSection
  search?: string
}

export function useParameters(params?: UseParametersParams) {
  return useQuery({
    queryKey: [...queryKeys.parameters, params],
    queryFn: () => parameterService.list(params),
  })
}
