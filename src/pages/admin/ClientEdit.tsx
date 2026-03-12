import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { clientService } from '@/services/clientService'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { ArrowLeft } from 'lucide-react'
import { Client } from '@/types/client'
import { useEffect } from 'react'

interface ClientForm {
  name: string
  email?: string
  document?: string
  phone?: string
  company?: string
  address?: string
  municipality?: string
}

export default function ClientEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { register, handleSubmit, reset } = useForm<ClientForm>()

  // carregar cliente

  const { data, isLoading } = useQuery({
    queryKey: ['client', id],
    queryFn: () => clientService.getClient(id!),
  })

  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  // mutation update

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ClientForm) => clientService.updateClient(id!, data),
  })

  async function onSubmit(data: ClientForm) {
    try {
      await mutateAsync(data)

      toast.success('Cliente atualizado com sucesso')

      navigate('/admin/clients')
    } catch (err) {
      toast.error('Erro ao atualizar cliente')
    }
  }

  if (isLoading) {
    return <div className="p-10 text-center">Carregando cliente...</div>
  }

  return (
    <div className="container max-w-xl py-10 space-y-6">
      {/* HEADER */}

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/clients')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>

        <h1 className="text-2xl font-bold">Editar cliente</h1>
      </div>

      {/* FORM */}

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Nome" {...register('name', { required: true })} />

          <Input placeholder="Documento (CPF/CNPJ)" {...register('document')} />

          <Input placeholder="Email" {...register('email')} />

          <Input placeholder="Telefone" {...register('phone')} />

          <Input placeholder="Empresa" {...register('company')} />

          <Input placeholder="Endereço" {...register('address')} />

          <Input placeholder="Município" {...register('municipality')} />

          <Button type="submit" disabled={isPending} className="w-full">
            Salvar alterações
          </Button>
        </form>
      </Card>
    </div>
  )
}
