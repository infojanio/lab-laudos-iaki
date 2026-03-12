import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReport } from '../api/create-report'

export function useCreateReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}
