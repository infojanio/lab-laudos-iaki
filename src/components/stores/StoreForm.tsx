import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const storeSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  slug: z.string().min(2, 'Slug obrigatório'),
  cnpj: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  isActive: z.boolean().default(true),
})

export type StoreFormData = z.infer<typeof storeSchema>

interface Props {
  defaultValues?: Partial<StoreFormData>
  isSubmitting?: boolean
  submitLabel?: string
  onSubmit: (data: StoreFormData) => void
}

export function StoreForm({
  defaultValues,
  isSubmitting,
  submitLabel = 'Salvar',
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      slug: defaultValues?.slug ?? '',
      cnpj: defaultValues?.cnpj ?? '',
      city: defaultValues?.city ?? '',
      state: defaultValues?.state ?? '',
      isActive: defaultValues?.isActive ?? true,
    },
  })

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do laboratório</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" {...register('slug')} />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input id="cnpj" {...register('cnpj')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" {...register('city')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">UF</Label>
            <Input id="state" {...register('state')} maxLength={2} />
          </div>

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <p className="font-medium">Laboratório ativo</p>
              <p className="text-sm text-muted-foreground">
                Define se a store pode operar no sistema
              </p>
            </div>

            <Switch
              checked={watch('isActive')}
              onCheckedChange={(checked) =>
                setValue('isActive', checked, { shouldValidate: true })
              }
            />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
      </form>
    </Card>
  )
}
