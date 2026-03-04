import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StepReportProps {
  data: {
    reportNumber: string
    issueDate: string
    normativeReference: string
  }
  onChange: (data: StepReportProps["data"]) => void
}

export default function StepReport({
  data,
  onChange,
}: StepReportProps) {
  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Identificação do Relatório
        </h2>
        <p className="text-sm text-muted-foreground">
          Informe os dados formais do relatório de ensaio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Número do Relatório */}
        <div className="space-y-2">
          <Label>Nº do Relatório</Label>
          <Input
            placeholder="Ex: 354/2025"
            value={data.reportNumber}
            onChange={(e) =>
              onChange({
                ...data,
                reportNumber: e.target.value,
              })
            }
          />
          <p className="text-xs text-muted-foreground">
            Pode ser manual ou futuramente auto-gerado.
          </p>
        </div>

        {/* Data de Emissão */}
        <div className="space-y-2">
          <Label>Data de Emissão</Label>
          <Input
            type="date"
            value={data.issueDate}
            onChange={(e) =>
              onChange({
                ...data,
                issueDate: e.target.value,
              })
            }
          />
        </div>

      </div>

      {/* Referência Normativa */}
      <div className="space-y-2">
        <Label>Referência Normativa</Label>
        <Select
          value={data.normativeReference}
          onValueChange={(value) =>
            onChange({
              ...data,
              normativeReference: value,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a normativa" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="RESOLUÇÃO CONAMA 357/05">
              RESOLUÇÃO CONAMA 357/05
            </SelectItem>

            <SelectItem value="Portaria GM/MS Nº 888/2021">
              Portaria GM/MS Nº 888/2021
            </SelectItem>
          </SelectContent>
        </Select>

        <p className="text-xs text-muted-foreground">
          Essa informação aparecerá no rodapé do relatório.
        </p>
      </div>

    </div>
  )
}