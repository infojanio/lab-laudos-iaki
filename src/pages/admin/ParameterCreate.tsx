import {
  ParameterFormData,
  ParameterForm,
} from '@/modules/parameters/components/ParameterForm'
import { useCreateParameter } from '@/modules/parameters/hooks/useCreateParameter'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function ParameterCreate() {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useCreateParameter()

  async function handleSubmit(data: ParameterFormData) {
    try {
      await mutateAsync({
        ...data,
        unit: data.unit || null,
        method: data.method || null,
        vmp: data.vmp || null,
      })

      toast.success('Parâmetro cadastrado com sucesso.')
      navigate('/parameters')
    } catch {
      toast.error('Erro ao cadastrar parâmetro.')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Novo parâmetro</h1>
      <ParameterForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Cadastrar"
      />
    </div>
  )
}
