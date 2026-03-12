import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createReportSchema,
  type CreateReportSchema,
} from '../schemas/create-report-schema'
import { useCreateReport } from '../hooks/use-create-report'
import { useNavigate } from 'react-router-dom'

export function CreateReportForm() {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useCreateReport()

  const form = useForm<CreateReportSchema>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      analysisType: 'AGUA',
      identification: '',
      location: '',
      clientId: '',
      results: [
        {
          section: 'FISICO_QUIMICO',
          parameter: '',
          result: '',
          unit: '',
          method: '',
          vmp: '',
        },
      ],
    },
  })

  const { control, register, handleSubmit, formState } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'results',
  })

  async function onSubmit(data: CreateReportSchema) {
    const response = await mutateAsync(data)
    navigate(`/reports/${response.id}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Tipo de análise
          </label>
          <select
            {...register('analysisType')}
            className="w-full rounded border px-3 py-2"
          >
            <option value="AGUA">Água</option>
            <option value="SOLO">Solo</option>
          </select>
          {formState.errors.analysisType && (
            <p className="mt-1 text-sm text-red-500">
              {formState.errors.analysisType.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Identificação
          </label>
          <input
            {...register('identification')}
            className="w-full rounded border px-3 py-2"
            placeholder="Poço artesiano"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Local</label>
          <input
            {...register('location')}
            className="w-full rounded border px-3 py-2"
            placeholder="Fazenda X"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Cliente ID</label>
          <input
            {...register('clientId')}
            className="w-full rounded border px-3 py-2"
            placeholder="UUID do cliente"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Resultados</h2>
          <button
            type="button"
            onClick={() =>
              append({
                section: 'FISICO_QUIMICO',
                parameter: '',
                result: '',
                unit: '',
                method: '',
                vmp: '',
              })
            }
            className="rounded bg-black px-4 py-2 text-white"
          >
            Adicionar linha
          </button>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 gap-3 rounded border p-4 md:grid-cols-6"
          >
            <input
              {...register(`results.${index}.section`)}
              placeholder="Seção"
              className="rounded border px-3 py-2"
            />
            <input
              {...register(`results.${index}.parameter`)}
              placeholder="Parâmetro"
              className="rounded border px-3 py-2"
            />
            <input
              {...register(`results.${index}.result`)}
              placeholder="Resultado"
              className="rounded border px-3 py-2"
            />
            <input
              {...register(`results.${index}.unit`)}
              placeholder="Unidade"
              className="rounded border px-3 py-2"
            />
            <input
              {...register(`results.${index}.method`)}
              placeholder="Método"
              className="rounded border px-3 py-2"
            />
            <div className="flex gap-2">
              <input
                {...register(`results.${index}.vmp`)}
                placeholder="VMP"
                className="w-full rounded border px-3 py-2"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="rounded border px-3 py-2"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? 'Salvando...' : 'Criar laudo'}
      </button>
    </form>
  )
}
