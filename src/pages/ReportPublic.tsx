import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { reportService } from "@/services/reportService";
import {
  Report,
  ANALYSIS_TYPE_LABELS,
} from "@/types";
import {
  FileDown,
  Calendar,
  User,
  FlaskConical,
} from "lucide-react";

const ReportPublic = () => {
  const { id } = useParams<{ id: string }>();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
  
    async function loadReport() {
      try {
        const data = await reportService.getPublicReport(id!); //verificar implementação sem !
        setReport(data);
      } catch {
        setReport(null);
      } finally {
        setLoading(false);
      }
    }
  
    loadReport();
  }, [id]);
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Laudo não encontrado.
      </div>
    );
  }

  // 🔹 Normaliza URL do PDF (funciona com relativo ou absoluto)
  const normalizedPdfUrl = report.signedPdfUrl
    ? report.signedPdfUrl.startsWith("http")
      ? report.signedPdfUrl
      : `${import.meta.env.VITE_API_URL}${report.signedPdfUrl}`
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <Card className="p-6 space-y-4 shadow-sm">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold">
                Laudo {report.code}
              </h1>
              <StatusBadge status={report.status} />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FlaskConical className="h-4 w-4 text-primary" />
                {ANALYSIS_TYPE_LABELS[report.analysisType]}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                Emissão:{" "}
                {new Date(report.issueDate).toLocaleDateString("pt-BR")}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4 text-primary" />
                {report.responsibleTechnician} —{" "}
                {report.technicianRegistration}
              </div>

              {report.description && (
                <p className="pt-2 text-muted-foreground">
                  {report.description}
                </p>
              )}
            </div>

            {normalizedPdfUrl ? (
              <Button
                variant="outline"
                className="w-full mt-4"
                asChild
              >
                <a
                  href={normalizedPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Baixar PDF Assinado
                </a>
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground mt-4 text-center">
                PDF ainda não disponível.
              </p>
            )}
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ReportPublic;
