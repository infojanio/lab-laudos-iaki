import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parameterService } from '@/services/parameterService'
import { queryKeys } from '@/lib/react-query/querykeys'

export function useCreateParameter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: parameterService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.parameters,
      })
    },
  })
}
