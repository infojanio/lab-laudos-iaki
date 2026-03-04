import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

interface StepObservationsProps {
  data: {
    useStandardText: boolean
    customText?: string
  }
  onChange: (data: StepObservationsProps["data"]) => void
}

export default function StepObservations({
  data,
  onChange,
}: StepObservationsProps) {

  const standardText = `
Os resultados referem-se exclusivamente à amostra analisada.
Este relatório só pode ser reproduzido na íntegra.
A responsabilidade pela coleta é do cliente quando não realizada pelo laboratório.
`

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Observações do Relatório
        </h2>
        <p className="text-sm text-muted-foreground">
          Defina observações técnicas ou utilize o texto padrão do laboratório.
        </p>
      </div>

      {/* Toggle texto padrão */}
      <div className="flex items-center justify-between border p-4 rounded-md">
        <div>
          <Label>Utilizar texto padrão do laboratório</Label>
          <p className="text-xs text-muted-foreground">
            Recomendado para manter padrão jurídico.
          </p>
        </div>

        <Switch
          checked={data.useStandardText}
          onCheckedChange={(checked) =>
            onChange({
              ...data,
              useStandardText: checked,
            })
          }
        />
      </div>

      {/* Preview do texto padrão */}
      {data.useStandardText && (
        <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-line">
          {standardText}
        </div>
      )}

      {/* Campo personalizado */}
      {!data.useStandardText && (
        <div className="space-y-2">
          <Label>Observações Personalizadas</Label>
          <Textarea
            placeholder="Digite observações técnicas específicas..."
            rows={5}
            value={data.customText || ""}
            onChange={(e) =>
              onChange({
                ...data,
                customText: e.target.value,
              })
            }
          />
        </div>
      )}

    </div>
  )
}