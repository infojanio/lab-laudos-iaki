import { CreateReportWizardData } from "@/pages/admin/CreateReportWizard";


interface Props {
  data: CreateReportWizardData;
}

export default function StepReview({ data }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Revisão Final</h2>

      <div className="rounded-md border p-4 text-sm space-y-2">
        <p className="font-semibold">Cliente</p>
        <p>{data.client.name || "—"}</p>
        <p>{data.client.document || "—"}</p>
        <p>{data.client.email || "—"}</p>
        <p>{data.client.phone || "—"}</p>
      </div>

      <div className="rounded-md border p-4 text-sm space-y-2">
        <p className="font-semibold">Amostra</p>
        <p>Identificação: {data.sample.identification || "—"}</p>
        <p>Local: {data.sample.location || "—"}</p>
        <p>Coleta: {data.sample.collectionDate || "—"} {data.sample.collectionTime || ""}</p>
        <p>Recebimento: {data.sample.entryDate || "—"}</p>
      </div>

      <p className="text-sm text-muted-foreground">
        (Na próxima etapa, vamos exibir também as tabelas de ensaios.)
      </p>
    </div>
  );
}
