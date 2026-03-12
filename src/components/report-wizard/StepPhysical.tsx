import { PHYSICAL_PARAMETERS } from '@/constants/analysisParameters'
import { Button } from '@/components/ui/button'

export default function StepPhysical({ data, onChange }: any) {
  const loadDefault = () => {
    const rows = PHYSICAL_PARAMETERS.map((p) => ({
      parameter: p.parameter,
      result: '',
      vmp: '',
      method: p.method,
    }))

    onChange(rows)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Análise Físico-Química</h2>

        <Button variant="outline" onClick={loadDefault}>
          Carregar parâmetros padrão
        </Button>
      </div>

      {/* tabela existente */}
    </div>
  )
}
