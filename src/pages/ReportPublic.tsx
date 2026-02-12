import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reportService } from "@/services/reportService";
import { Report, ANALYSIS_TYPE_LABELS, REPORT_STATUS_LABELS } from "@/types";
import { Card } from "@/components/ui/card";

export default function ReportPublic() {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    reportService.getPublicReport(id)
      .then(setReport)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Carregando...</p>;
  if (!report) return <p className="p-8">Laudo não encontrado.</p>;

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <Card className="max-w-3xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Laudo {report.code}</h1>

        <p><strong>Tipo:</strong> {ANALYSIS_TYPE_LABELS[report.analysisType]}</p>
        <p><strong>Status:</strong> {REPORT_STATUS_LABELS[report.status]}</p>
        <p><strong>Data de Emissão:</strong> {new Date(report.issueDate).toLocaleDateString("pt-BR")}</p>
        <p><strong>Responsável Técnico:</strong> {report.responsibleTechnician}</p>

        {report.pdfUrl && (
          <a
            href={report.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Baixar PDF Assinado
          </a>
        )}
      </Card>
    </div>
  );
}
