import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface MicroRow {
  parameter: string;
  result: string;
  unit?: string;
  method?: string;
}

interface Props {
  data: MicroRow[];
  onChange: (rows: MicroRow[]) => void;
}

const SUGGESTED_PARAMETERS = [
  "Coliformes Totais",
  "Escherichia coli",
  "Enterococos",
];

export default function StepMicrobiological({ data, onChange }: Props) {
  function addRow(prefill?: Partial<MicroRow>) {
    onChange([
      ...data,
      {
        parameter: prefill?.parameter ?? "",
        result: prefill?.result ?? "",
        unit: prefill?.unit ?? "",
        method: prefill?.method ?? "",
      },
    ]);
  }

  function removeRow(index: number) {
    const updated = [...data];
    updated.splice(index, 1);
    onChange(updated);
  }

  function updateRow(index: number, field: keyof MicroRow, value: string) {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Ensaios Bacteriológicos</h2>
          <p className="text-sm text-muted-foreground">
            Adicione os parâmetros bacteriológicos analisados (ex.: Coliformes Totais, E. coli).
          </p>
        </div>

        <Button type="button" size="sm" onClick={() => addRow()}>
          <Plus className="h-4 w-4 mr-1" />
          Adicionar Parâmetro
        </Button>
      </div>

      {/* Atalhos (UX SaaS) */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_PARAMETERS.map((p) => (
          <Button
            key={p}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addRow({ parameter: p })}
          >
            + {p}
          </Button>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-sm text-muted-foreground border rounded-md p-6 text-center">
          Nenhum ensaio bacteriológico adicionado ainda.
        </div>
      )}

      {data.map((row, index) => (
        <div
          key={index}
          className="border rounded-md p-4 space-y-4 bg-muted/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Parâmetro (ex.: E. coli)"
              value={row.parameter}
              onChange={(e) => updateRow(index, "parameter", e.target.value)}
            />

            <Input
              placeholder="Resultado (ex.: Ausente / Presente / < 1)"
              value={row.result}
              onChange={(e) => updateRow(index, "result", e.target.value)}
            />

            <Input
              placeholder="Unidade (opcional)"
              value={row.unit ?? ""}
              onChange={(e) => updateRow(index, "unit", e.target.value)}
            />

            <Input
              placeholder="Método (opcional)"
              value={row.method ?? ""}
              onChange={(e) => updateRow(index, "method", e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeRow(index)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remover
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
