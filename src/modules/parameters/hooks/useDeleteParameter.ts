import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parameterService } from '@/services/parameterService'
import { queryKeys } from '@/lib/react-query/querykeys'

export function useDeleteParameter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: parameterService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.parameters,
      })
    },
  })
}
