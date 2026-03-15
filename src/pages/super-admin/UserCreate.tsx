import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { superAdminService } from '@/services/superAdminService'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha mínima de 6 caracteres'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN']),
  storeId: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function UserCreate() {
  const navigate = useNavigate()

  const { data: stores } = useQuery({
    queryKey: ['admin-stores-select'],
    queryFn: () => superAdminService.listStores(),
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: superAdminService.createUser,
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'ADMIN',
    },
  })

  const role = watch('role')

  async function onSubmit(data: FormData) {
    try {
      await mutateAsync({
        ...data,
        storeId: data.role === 'ADMIN' ? data.storeId || null : null,
      })

      toast.success('Usuário criado com sucesso.')
      navigate('/admin/users')
    } catch {
      toast.error('Erro ao criar usuário.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Novo usuário</h2>
        <p className="text-muted-foreground">
          Crie um novo usuário administrativo
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register('name')} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Perfil</Label>
              <Select
                value={role}
                onValueChange={(value) =>
                  setValue('role', value as 'SUPER_ADMIN' | 'ADMIN', {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="SUPER_ADMIN">SUPER_ADMIN</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === 'ADMIN' && (
              <div className="space-y-2 md:col-span-2">
                <Label>Laboratório</Label>
                <Select
                  onValueChange={(value) =>
                    setValue('storeId', value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o laboratório" />
                  </SelectTrigger>
                  <SelectContent>
                    {(stores ?? []).map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.storeId && (
                  <p className="text-sm text-red-500">
                    {errors.storeId.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Salvando...' : 'Criar usuário'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
