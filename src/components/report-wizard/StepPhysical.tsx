import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhysicalRow } from "@/pages/admin/CreateReportWizard"; // ajuste caminho se necessário

interface StepPhysicalProps {
  data: PhysicalRow[];
  onChange: (rows: PhysicalRow[]) => void;
}

export default function StepPhysical({
  data,
  onChange,
}: StepPhysicalProps) {

  const addRow = () => {
    onChange([
      ...data,
      { parameter: "", result: "", unit: "", method: "" },
    ]);
  };

  const updateRow = (
    index: number,
    field: keyof PhysicalRow,
    value: string
  ) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeRow = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Análises Físico-Químicas
      </h2>

      {data.map((row, index) => (
        <div key={index} className="grid grid-cols-4 gap-3 items-end">

          <Input
            placeholder="Parâmetro"
            value={row.parameter}
            onChange={(e) =>
              updateRow(index, "parameter", e.target.value)
            }
          />

          <Input
            placeholder="Resultado"
            value={row.result}
            onChange={(e) =>
              updateRow(index, "result", e.target.value)
            }
          />

          <Input
            placeholder="Unidade"
            value={row.unit}
            onChange={(e) =>
              updateRow(index, "unit", e.target.value)
            }
          />

          <div className="flex gap-2">
            <Input
              placeholder="Método"
              value={row.method}
              onChange={(e) =>
                updateRow(index, "method", e.target.value)
              }
            />

            <Button
              variant="destructive"
              onClick={() => removeRow(index)}
            >
              Remover
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addRow}>
        + Adicionar Parâmetro
      </Button>
    </div>
  );
}
