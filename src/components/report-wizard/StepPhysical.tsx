import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

export interface PhysicalRow {
  parameter: string
  analysisDate: string
  result: string
  vmp: string
  method: string
}

interface StepPhysicalProps {
  data: PhysicalRow[]
  onChange: (rows: PhysicalRow[]) => void
}

export default function StepPhysical({
  data,
  onChange,
}: StepPhysicalProps) {

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
    field: keyof PhysicalRow,
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
          Ensaios Físico-Químicos
        </h2>
        <p className="text-sm text-muted-foreground">
          Informe os parâmetros analisados conforme laudo técnico.
        </p>
      </div>

      {/* HEADER DA TABELA */}
      <div className="hidden md:grid grid-cols-6 gap-4 text-xs font-medium text-muted-foreground border-b pb-2">
        <span>Parâmetro</span>
        <span>Data Análise</span>
        <span>Resultado</span>
        <span>VMP</span>
        <span>Método</span>
        <span></span>
      </div>

      {/* LINHAS */}
      <div className="space-y-4">
        {data.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center"
          >
            <Input
              placeholder="Ex: pH"
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
              placeholder="Ex: 7,2"
              value={row.result}
              onChange={(e) =>
                updateRow(index, "result", e.target.value)
              }
            />

            <Input
              placeholder="Ex: 6,0 - 9,5"
              value={row.vmp}
              onChange={(e) =>
                updateRow(index, "vmp", e.target.value)
              }
            />

            <Input
              placeholder="Ex: SMEWW 4500-H+"
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

      {/* BOTÃO ADICIONAR */}
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