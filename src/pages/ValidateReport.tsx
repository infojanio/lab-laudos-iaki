import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { reportService } from "@/services/reportService";
import { Report, ANALYSIS_TYPE_LABELS } from "@/types";
import { Search, QrCode, FileDown, AlertCircle, Calendar, User, FlaskConical, Building2 } from "lucide-react";



import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
//import { env } from '@/env'


const signInSchema = z.object({
  reportId: z.string().min(1, 'Informe a chave do laudo'),
})

type SignInData = z.infer<typeof signInSchema>

const ValidateReport = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const [code, setCode] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSearch(data: SignInData) {
    try {
      const response = await fetch(
        `${env.VITE_API_URL}/reports/${data.reportId}`,
      )
      const result = await response.json()

      if (!response.ok || !result?.report?.signedPdfUrl) {
        throw new Error('Laudo não encontrado')
      }

      // Redireciona para a visualização pública do laudo
      navigate(`/reports/${data.reportId}`)
    } catch (error) {
      toast.error('Laudo não encontrado. Verifique a chave digitada.')
    }
  }


  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <QrCode className="h-8 w-8 text-accent-foreground" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Validar Laudo</h1>
            <p className="text-muted-foreground mt-2">
              Digite o código do laudo para verificar sua autenticidade.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSearch)} className="space-y-4">


            <div className="space-y-2">
              <Label htmlFor="reportId"></Label>
              <Input id="reportId" {...register('reportId')} />
              {errors.reportId && (
                <p className="text-sm text-red-500">
                  {errors.reportId.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Buscando...' : 'Acessar Laudo'}
            </Button>
          </form>

          {searched && !report && (
            <Card className="mt-8 border-destructive/30">
              <CardContent className="flex items-center gap-3 py-6">
                <AlertCircle className="h-6 w-6 text-destructive shrink-0" />
                <div>
                  <p className="font-semibold">Laudo não encontrado</p>
                  <p className="text-sm text-muted-foreground">Verifique o código digitado e tente novamente.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {report && (
            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-display text-xl">{report.code}</CardTitle>
                  <StatusBadge status={report.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{report.labName}</span>
                </div>
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
                <p className="text-muted-foreground pt-2">{report.description}</p>
                <Button variant="outline" className="w-full mt-4" onClick={() => alert("Download simulado do PDF")}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Baixar PDF do Laudo
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ValidateReport;
