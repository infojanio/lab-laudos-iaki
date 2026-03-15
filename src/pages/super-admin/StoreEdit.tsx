import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { superAdminService } from '@/services/superAdminService'
import { StoreForm, StoreFormData } from '@/components/stores/StoreForm'

export default function StoreEdit() {
  const { id = '' } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-store', id],
    queryFn: () => superAdminService.getStoreById(id),
    enabled: !!id,
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formData: StoreFormData) =>
      superAdminService.updateStore(id, formData),
  })

  async function handleSubmit(data: StoreFormData) {
    try {
      await mutateAsync({
        ...data,
        cnpj: data.cnpj || undefined,
        city: data.city || undefined,
        state: data.state || undefined,
      })

      toast.success('Laboratório atualizado com sucesso.')
      navigate('/admin/stores')
    } catch {
      toast.error('Erro ao atualizar laboratório.')
    }
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!data) {
    return <div>Laboratório não encontrado.</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Editar laboratório</h2>
        <p className="text-muted-foreground">
          Atualize os dados do laboratório
        </p>
      </div>

      <StoreForm
        defaultValues={{
          name: data.name,
          slug: data.slug,
          cnpj: data.cnpj ?? '',
          city: data.city ?? '',
          state: data.state ?? '',
          isActive: data.isActive,
        }}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Salvar alterações"
      />
    </div>
  )
}
