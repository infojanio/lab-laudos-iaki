import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '@/lib/axios'

interface ReportData {
  id: string
  customerName: string
  address: string
  document: string
  phone: string
  email: string
  technicianName: string
  sampleOrigin: string
  sampleType: string
  entryDate: string
  collectionDate: string
  collectionTime: string
  collectionAgent: string
  notes?: string
  signedPdfUrl?: string
  analysisResults: Record<string, string>
}

export function Report() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await api.get(`/reports/${id}`)
        setReport(response.data.report)
      } catch (error) {
        console.error('Erro ao buscar relatório:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [id])

  if (loading)
    return <p className="text-center mt-10">Carregando relatório...</p>
  if (!report)
    return (
      <p className="text-center mt-10 text-red-500">Laudo não encontrado.</p>
    )

  const analysisFields = [
    { key: 'fluoreto', label: 'Fluoreto - máx. 1.5 mg/L' },
    { key: 'turbidez', label: 'Turbidez - máx. 5 uT (PRT GM/MS nº 888/21)' },
    {
      key: 'corAparente',
      label: 'Cor Aparente - máx. 15 uH (PRT GM/MS nº 888/21)',
    },
    { key: 'ph', label: 'pH - faixa 6.0 a 9.5' },
    { key: 'temperatura', label: 'Temperatura - monitoramento (°C)' },
    { key: 'alcalinidade', label: 'Alcalinidade - máx. 120 mg/L' },
    { key: 'durezaTotal', label: 'Dureza total - máx. 500 mg/L' },
    { key: 'durezaCalcio', label: 'Dureza de Cálcio - monitoramento (mg/L)' },
    {
      key: 'durezaMagnesio',
      label: 'Dureza de Magnésio - monitoramento (mg/L)',
    },
    { key: 'cloretos', label: 'Cloretos - máx. 250 mg/L' },
    {
      key: 'materiaOrganica',
      label: 'Matéria Orgânica - monitoramento (mg/L)',
    },
    { key: 'condutividade', label: 'Condutividade - máx. 100 µS/cm' },
    {
      key: 'solidosDissolvidos',
      label: 'Sólidos Totais Dissolvidos - máx. 1000 mg/L',
    },
    { key: 'aluminio', label: 'Alumínio - máx. 0.2 mg/L' },
    { key: 'ferro', label: 'Ferro - máx. 0.3 mg/L' },
    { key: 'manganes', label: 'Manganês - máx. 0.1 mg/L' },
    { key: 'amonia', label: 'Amônia / Nitrogênio Amoniacal - máx. 1.5 mg/L' },
    { key: 'fosforoTotal', label: 'Fósforo Total - máx. 0.1 mg/L' },
    { key: 'nitrato', label: 'Nitrato - máx. 10 mg/L' },
    { key: 'nitrito', label: 'Nitrito - máx. 1 mg/L' },
    { key: 'sulfato', label: 'Sulfato - máx. 250 mg/L' },
    {
      key: 'sulfetoHidrogenio',
      label: 'Sulfeto de Hidrogênio - máx. 0.002 mg/L',
    },
    { key: 'gasCarbonico', label: 'Gás Carbônico - monitoramento (mg/L)' },
    { key: 'sodio', label: 'Sódio - máx. 200 mg/L' },
    { key: 'coliformeTotal', label: 'Índ.Coliforme Total - NMP/100 mL' },
    {
      key: 'escherichiaColi',
      label: 'Índice de Escherichia Coli - NMP/100 mL',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white shadow-md rounded-md print:px-0 print:shadow-none print:bg-white">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Voltar
        </button>
        <button
          onClick={() => window.print()}
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Imprimir
        </button>
      </div>

      <div className="text-center mb-6">
        <img
          src="/src/public/logo.jpeg"
          alt="LabMoura"
          className="mx-auto h-20 mb-4"
        />
        <h1 className="text-2xl font-bold">Relatório de Análise de Água</h1>
        <p className="text-sm text-muted-foreground">
          Chave de validação: {report.id}
        </p>
      </div>

      {/* Dados do Cliente e Amostra */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <strong>Cliente:</strong> {report.customerName}
        </div>
        <div>
          <strong>CPF/CNPJ:</strong> {report.document}
        </div>
        <div>
          <strong>Endereço:</strong> {report.address}
        </div>
        <div>
          <strong>Telefone:</strong> {report.phone}
        </div>
        <div>
          <strong>Email:</strong> {report.email}
        </div>
        <div>
          <strong>Técnico Responsável:</strong> {report.technicianName}
        </div>
        <div>
          <strong>Origem da Amostra:</strong> {report.sampleOrigin}
        </div>
        <div>
          <strong>Tipo:</strong> {report.sampleType}
        </div>
        <div>
          <strong>Data de Entrada:</strong> {report.entryDate}
        </div>
        <div>
          <strong>Data da Coleta:</strong> {report.collectionDate}
        </div>
        <div>
          <strong>Hora da Coleta:</strong> {report.collectionTime}
        </div>
        <div>
          <strong>Responsável pela Coleta:</strong> {report.collectionAgent}
        </div>
      </div>

      {report.notes && (
        <div className="mb-6">
          <strong>Observações:</strong>
          <p>{report.notes}</p>
        </div>
      )}

      {/* Resultados da Análise */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">
          Resultados das Análises Físico-Químicas
        </h2>
        <table className="w-full text-sm table-auto border border-gray-300 mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Parâmetro</th>
              <th className="p-2 text-left">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {analysisFields.map(({ key, label }) => (
              <tr key={key} className="border-t">
                <td className="p-2">{label}</td>
                <td className="p-2 text-gray-800">
                  {report.analysisResults[key] ?? (
                    <em className="text-gray-400">Não informado</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>{' '}
      </div>

      {/* Assinatura por imagem */}
      <div className="text-center mt-12 space-y-4">
        <p className="text-sm text-gray-700"></p>

        <div className="inline-block p-2 bg-white shadow rounded">
          <img
            src="/src/public/assinatura.jfif"
            alt="Assinatura LabMoura"
            className="mx-auto h-96 object-contain print:block"
          />
        </div>

        {report.signedPdfUrl && (
          <div className="mt-4 print:hidden">
            <a
              href={report.signedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              📄 Baixar PDF Assinado
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
