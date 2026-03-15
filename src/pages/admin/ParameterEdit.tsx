import {
  ParameterFormData,
  ParameterForm,
} from '@/modules/parameters/components/ParameterForm'
import { useParameter } from '@/modules/parameters/hooks/useParameter'
import { useUpdateParameter } from '@/modules/parameters/hooks/useUpdateParameter'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export function ParameterEdit() {
  const { id = '' } = useParams()
  const navigate = useNavigate()

  const { data: parameter, isLoading } = useParameter(id)
  const { mutateAsync, isPending } = useUpdateParameter(id)

  async function handleSubmit(data: ParameterFormData) {
    try {
      await mutateAsync({
        ...data,
        unit: data.unit || null,
        method: data.method || null,
        vmp: data.vmp || null,
      })

      toast.success('Parâmetro atualizado com sucesso.')
      navigate('/parameters')
    } catch {
      toast.error('Erro ao atualizar parâmetro.')
    }
  }

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (!parameter) {
    return <p>Parâmetro não encontrado.</p>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Editar parâmetro</h1>

      <ParameterForm
        defaultValues={{
          name: parameter.name,
          unit: parameter.unit ?? '',
          method: parameter.method ?? '',
          vmp: parameter.vmp ?? '',
          section: parameter.section,
        }}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Salvar alterações"
      />
    </div>
  )
}
