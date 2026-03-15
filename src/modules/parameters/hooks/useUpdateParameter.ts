import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parameterService } from '@/services/parameterService'
import { queryKeys } from '@/lib/react-query/querykeys'

export function useUpdateParameter(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Parameters<typeof parameterService.update>[1]) =>
      parameterService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.parameters })
      queryClient.invalidateQueries({ queryKey: queryKeys.parameter(id) })
    },
  })
}
