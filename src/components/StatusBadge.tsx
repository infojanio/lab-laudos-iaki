import { ReportStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig: Record<ReportStatus, { label: string; className: string }> = {
  valido: { label: "Válido", className: "bg-success text-success-foreground" },
  substituido: { label: "Substituído", className: "bg-warning text-warning-foreground" },
  cancelado: { label: "Cancelado", className: "bg-destructive text-destructive-foreground" },
  em_analise: { label: "Em Análise", className: "bg-info text-info-foreground" },
};

export function StatusBadge({ status }: { status: ReportStatus }) {
  const config = statusConfig[status];
  return (
    <Badge className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}
