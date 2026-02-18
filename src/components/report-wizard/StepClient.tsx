import { Input } from "@/components/ui/input";

interface Props {
  data: any;
  onChange: (data: any) => void;
}

export default function StepClient({ data, onChange }: Props) {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold">
        Dados do Cliente
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input
          placeholder="Nome / Razão Social"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
        />

        <Input
          placeholder="CNPJ / CPF"
          value={data.document}
          onChange={(e) => onChange({ ...data, document: e.target.value })}
        />

        <Input
          placeholder="Email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
        />

        <Input
          placeholder="Telefone"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
        />

        <Input
          placeholder="Município"
          value={data.municipality}
          onChange={(e) =>
            onChange({ ...data, municipality: e.target.value })
          }
        />

        <Input
          placeholder="Endereço"
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
        />

      </div>
    </div>
  );
}
