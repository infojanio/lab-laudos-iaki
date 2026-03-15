import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { superAdminService } from '@/services/superAdminService'
import { StoreForm, StoreFormData } from '@/components/stores/StoreForm'

export default function StoreCreate() {
  const navigate = useNavigate()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: superAdminService.createStore,
  })

  async function handleSubmit(data: StoreFormData) {
    try {
      await mutateAsync({
        ...data,
        cnpj: data.cnpj || null,
        city: data.city || null,
        state: data.state || null,
      })

      toast.success('Laboratório criado com sucesso.')
      navigate('/admin/stores')
    } catch {
      toast.error('Erro ao criar laboratório.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Novo laboratório</h2>
        <p className="text-muted-foreground">
          Cadastre um novo laboratório na plataforma
        </p>
      </div>

      <StoreForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Criar laboratório"
      />
    </div>
  )
}
