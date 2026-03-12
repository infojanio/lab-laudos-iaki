import { Report, ANALYSIS_TYPE_LABELS } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/StatusBadge'

import {
  FileDown,
  Calendar,
  User,
  FlaskConical,
  ExternalLink,
} from 'lucide-react'

export function ReportCard({
  report,
  showClient = false,
}: {
  report: Report
  showClient?: boolean
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      {/* HEADER */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base font-display">
              {report.code}
            </CardTitle>

            <p className="text-sm text-muted-foreground mt-1">
              {report.description ?? 'Relatório de Ensaio'}
            </p>
          </div>

          <StatusBadge status={report.status} />
        </div>
      </CardHeader>

      {/* BODY */}
      <CardContent className="space-y-2 text-sm">
        {/* Tipo análise */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <FlaskConical className="h-4 w-4 text-primary" />
          {ANALYSIS_TYPE_LABELS[report.analysisType] ?? report.analysisType}
        </div>

        {/* Data emissão */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          Emissão:{' '}
          {report.issueDate
            ? new Date(report.issueDate).toLocaleDateString('pt-BR')
            : '—'}
        </div>

        {/* Técnico */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4 text-primary" />
          {report.responsibleTechnician ?? '—'}
          {report.technicianRegistration && (
            <> — {report.technicianRegistration}</>
          )}
        </div>

        {/* Cliente */}
        {showClient && report.client && (
          <div className="text-muted-foreground">
            Cliente:{' '}
            <span className="text-foreground font-medium">
              {report.client.name}
            </span>
          </div>
        )}

        {/* BOTÃO PDF */}
        {report.signedPdfUrl ? (
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={() => window.open(report.signedPdfUrl!, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Abrir PDF
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="mt-3 w-full" disabled>
            <FileDown className="h-4 w-4 mr-2" />
            PDF não disponível
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
