import { Input } from "@/components/ui/input";

interface SampleData {
  identification: string;
  location: string;
  collectionDate: string;
  collectionTime: string;
  collectionAgent: string;
  entryDate: string;
}

interface Props {
  data: SampleData;
  onChange: (data: SampleData) => void;
}

export default function StepSample({ data, onChange }: Props) {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold">
        Dados da Amostra
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input
          placeholder="Identificação da Amostra"
          value={data.identification}
          onChange={(e) =>
            onChange({ ...data, identification: e.target.value })
          }
        />

        <Input
          placeholder="Local da Coleta"
          value={data.location}
          onChange={(e) =>
            onChange({ ...data, location: e.target.value })
          }
        />

        <Input
          type="date"
          value={data.collectionDate}
          onChange={(e) =>
            onChange({ ...data, collectionDate: e.target.value })
          }
        />

        <Input
          type="time"
          value={data.collectionTime}
          onChange={(e) =>
            onChange({ ...data, collectionTime: e.target.value })
          }
        />

        <Input
          placeholder="Responsável pela Coleta"
          value={data.collectionAgent}
          onChange={(e) =>
            onChange({ ...data, collectionAgent: e.target.value })
          }
        />

        <Input
          type="date"
          value={data.entryDate}
          onChange={(e) =>
            onChange({ ...data, entryDate: e.target.value })
          }
        />

      </div>
    </div>
  );
}
