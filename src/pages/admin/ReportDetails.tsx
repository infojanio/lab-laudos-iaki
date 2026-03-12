import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { ArrowLeft, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ReportDetails() {
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['report', id],
    queryFn: async () => {
      const response = await api.get(`/reports/${id}`)
      return response.data.report
    },
  })

  if (isLoading) {
    return <div className="p-10 text-center">Carregando relatório...</div>
  }

  const report = data

  const physical = report.results?.filter(
    (r: any) => r.section === 'FISICO_QUIMICO',
  )

  const microbiological = report.results?.filter(
    (r: any) => r.section === 'MICROBIOLOGICO',
  )

  return (
    <div className="container max-w-5xl py-10 space-y-6">
      <Link to="/admin">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      </Link>

      <h1 className="text-3xl font-bold">Relatório {report.code}</h1>

      <Card className="p-6 space-y-3">
        <p>
          <b>Tipo:</b> {report.analysisType}
        </p>
        <p>
          <b>Identificação:</b> {report.identification}
        </p>
        <p>
          <b>Local:</b> {report.location}
        </p>

        <p>
          <b>Criado em:</b>{' '}
          {new Date(report.createdAt).toLocaleDateString('pt-BR')}
        </p>
      </Card>

      {/* FISICO QUIMICO */}

      {physical?.length > 0 && (
        <Card className="p-6">
          <h2 className="font-bold mb-4">Análise Físico-Química</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th>Parâmetro</th>
                <th>Resultado</th>
                <th>Método</th>
              </tr>
            </thead>

            <tbody>
              {physical.map((r: any) => (
                <tr key={r.id}>
                  <td>{r.parameter}</td>
                  <td>{r.result}</td>
                  <td>{r.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* MICROBIOLOGICO */}

      {microbiological?.length > 0 && (
        <Card className="p-6">
          <h2 className="font-bold mb-4">Análise Microbiológica</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th>Parâmetro</th>
                <th>Resultado</th>
                <th>Método</th>
              </tr>
            </thead>

            <tbody>
              {microbiological.map((r: any) => (
                <tr key={r.id}>
                  <td>{r.parameter}</td>
                  <td>{r.result}</td>
                  <td>{r.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* PDF */}

      {report.signedPdfUrl && (
        <Card className="p-6 flex justify-between items-center">
          <span>PDF do laudo disponível</span>

          <a
            href={report.signedPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>
              <FileText className="h-4 w-4 mr-1" />
              Abrir PDF
            </Button>
          </a>
        </Card>
      )}
    </div>
  )
}
