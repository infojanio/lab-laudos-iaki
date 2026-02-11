import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { env } from '@/env'

interface Report {
  id: string
  createdAt: string
  signedPdfUrl?: string
}

export function ReportListPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function fetchReports() {
    try {
      setLoading(true)

      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      params.append('page', String(page))
      params.append('perPage', '10') // Pode ajustar se quiser mais/menos por página

      const url = `${env.VITE_API_URL}/reports${
        params.toString() ? `?${params.toString()}` : ''
      }`

      const res = await fetch(url, { cache: 'no-cache' })
      const data = await res.json()

      setReports(data.reports || [])
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error('Erro ao buscar laudos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
    // sempre busca os dados se o componente montar ou mudar page/data
  }, [page, startDate, endDate])

  function handlePrevPage() {
    setPage((prev) => Math.max(prev - 1, 1))
  }

  function handleNextPage() {
    setPage((prev) => prev + 1)
  }

  return (
    <>
      <Helmet title="Laudos Cadastrados" />
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">📋 Laudos Cadastrados</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>
            ← Voltar
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm mb-1">Data Inicial</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Data Final</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
          </div>

          <Button
            onClick={() => {
              setPage(1)
              fetchReports()
            }}
          >
            🔍 Buscar
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Carregando...</p>
        ) : reports.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhum laudo encontrado.</p>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {reports.map((report) => (
                <li
                  key={report.id}
                  className="p-4 border rounded shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div>
                    <p className="text-sm">
                      <strong>ID:</strong> {report.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Data:</strong>{' '}
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {report.signedPdfUrl && (
                    <a
                      href={report.signedPdfUrl}
                      className="mt-3 sm:mt-0 text-blue-600 hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📄 Ver PDF
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex justify-center gap-4">
              <Button onClick={handlePrevPage} disabled={page === 1}>
                ⬅ Anterior
              </Button>
              <span className="text-sm text-gray-700 self-center">
                Página {page} de {totalPages}
              </span>
              <Button onClick={handleNextPage} disabled={page >= totalPages}>
                Próxima ➡
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
