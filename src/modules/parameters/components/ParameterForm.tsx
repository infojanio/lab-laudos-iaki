import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ReportSection } from '@/types/parameter'

const parameterSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  unit: z.string().optional(),
  method: z.string().optional(),
  vmp: z.string().optional(),
  section: z.enum(['FISICO_QUIMICO', 'MICROBIOLOGICO']),
})

export type ParameterFormData = z.infer<typeof parameterSchema>

interface ParameterFormProps {
  defaultValues?: Partial<ParameterFormData>
  onSubmit: (data: ParameterFormData) => void
  isSubmitting?: boolean
  submitLabel?: string
}

export function ParameterForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Salvar',
}: ParameterFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ParameterFormData>({
    resolver: zodResolver(parameterSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      unit: defaultValues?.unit ?? '',
      method: defaultValues?.method ?? '',
      vmp: defaultValues?.vmp ?? '',
      section: (defaultValues?.section as ReportSection) ?? 'FISICO_QUIMICO',
    },
  })

  const sectionValue = watch('section')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parâmetro</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unidade</Label>
            <Input
              id="unit"
              {...register('unit')}
              placeholder="Ex: mg/L, uH, NMP/100mL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">Método</Label>
            <Input
              id="method"
              {...register('method')}
              placeholder="Ex: SMEWW 4500-H+"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vmp">VMP</Label>
            <Input
              id="vmp"
              {...register('vmp')}
              placeholder="Ex: 5,0 ou Ausência"
            />
          </div>

          <div className="space-y-2">
            <Label>Seção</Label>
            <Select
              value={sectionValue}
              onValueChange={(value) =>
                setValue('section', value as ReportSection, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a seção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FISICO_QUIMICO">Físico-químico</SelectItem>
                <SelectItem value="MICROBIOLOGICO">Microbiológico</SelectItem>
              </SelectContent>
            </Select>
            {errors.section && (
              <p className="text-sm text-red-500">{errors.section.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
