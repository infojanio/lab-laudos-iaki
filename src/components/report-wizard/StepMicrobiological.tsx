import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

export interface MicroRow {
  parameter: string
  analysisDate: string
  result: string
  vmp: string
  method: string
}

interface StepMicrobiologicalProps {
  data: MicroRow[]
  onChange: (rows: MicroRow[]) => void
}

export default function StepMicrobiological({
  data,
  onChange,
}: StepMicrobiologicalProps) {

  const addRow = () => {
    onChange([
      ...data,
      {
        parameter: "",
        analysisDate: "",
        result: "",
        vmp: "",
        method: "",
      },
    ])
  }

  const updateRow = (
    index: number,
    field: keyof MicroRow,
    value: string
  ) => {
    const updated = [...data]
    updated[index][field] = value
    onChange(updated)
  }

  const removeRow = (index: number) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
  }

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Ensaios Bacteriológicos
        </h2>
        <p className="text-sm text-muted-foreground">
          Informe os parâmetros microbiológicos analisados conforme metodologia aplicada.
        </p>
      </div>

      {/* Cabeçalho da Tabela */}
      <div className="hidden md:grid grid-cols-6 gap-4 text-xs font-medium text-muted-foreground border-b pb-2">
        <span>Parâmetro</span>
        <span>Data Análise</span>
        <span>Resultado</span>
        <span>VMP</span>
        <span>Método</span>
        <span></span>
      </div>

      {/* Linhas */}
      <div className="space-y-4">
        {data.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center"
          >
            <Input
              placeholder="Ex: Coliformes Totais"
              value={row.parameter}
              onChange={(e) =>
                updateRow(index, "parameter", e.target.value)
              }
            />

            <Input
              type="date"
              value={row.analysisDate}
              onChange={(e) =>
                updateRow(index, "analysisDate", e.target.value)
              }
            />

            <Input
              placeholder="Ex: Ausente"
              value={row.result}
              onChange={(e) =>
                updateRow(index, "result", e.target.value)
              }
            />

            <Input
              placeholder="Ex: Ausente em 100mL"
              value={row.vmp}
              onChange={(e) =>
                updateRow(index, "vmp", e.target.value)
              }
            />

            <Input
              placeholder="Ex: SMEWW 9222 B"
              value={row.method}
              onChange={(e) =>
                updateRow(index, "method", e.target.value)
              }
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeRow(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      {/* Botão adicionar */}
      <div className="pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={addRow}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Parâmetro
        </Button>
      </div>

    </div>
  )
}