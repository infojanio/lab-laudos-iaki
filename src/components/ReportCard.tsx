import { Report, ANALYSIS_TYPE_LABELS } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { FileDown, Calendar, User, FlaskConical } from "lucide-react";

export function ReportCard({ report, showClient = false }: { report: Report; showClient?: boolean }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base font-display">{report.code}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
          </div>
          <StatusBadge status={report.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FlaskConical className="h-4 w-4 text-primary" />
          {ANALYSIS_TYPE_LABELS[report.analysisType]}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          Emissão: {new Date(report.issueDate).toLocaleDateString("pt-BR")}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4 text-primary" />
          {report.responsibleTechnician} — {report.technicianRegistration}
        </div>
        {showClient && report.client && (
          <div className="text-muted-foreground">
            Cliente: <span className="text-foreground font-medium">{report.client.name}</span>
          </div>
        )}
        <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => alert("Download simulado do PDF")}>
          <FileDown className="h-4 w-4 mr-2" />
          Baixar PDF
        </Button>
      </CardContent>
    </Card>
  );
}
