// src/pages/public/laudo-view.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'

import { env } from '@/env'

interface Report {
  id: string
  signedPdfUrl?: string
  createdAt: string
}

export function LaudoView() {
  const { id } = useParams()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  //const backendBaseURL = 'https://labmoura-api-production-9089.up.railway.app'

  useEffect(() => {
    async function fetchLaudo() {
      try {
        const response = await fetch(`${env.VITE_API_URL}/reports/${id}`)
        const data = await response.json()
        setReport(data.report)
      } catch {
        setReport(null)
      } finally {
        setLoading(false)
      }
    }

    fetchLaudo()
  }, [id])

  if (loading) return <p className="p-4">Carregando laudo...</p>
  if (!report) return <p className="p-4 text-red-600">Laudo não encontrado.</p>

  return (
    <>
      <Helmet title="Visualização do Laudo" />
      <div className="max-w-2xl mx-auto px-4 py-8 bg-white shadow rounded-lg mt-8 border">
        <h1 className="text-2xl font-bold mb-4">Laudo #{report.id}</h1>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Data de Cadastro:</strong>{' '}
            {new Date(report.createdAt).toLocaleDateString()}
          </p>
        </div>

        {report.signedPdfUrl && (
          <div className="mt-6">
            <a
              href={`${env.VITE_API_URL}/pdf/laudo-${report.id}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full">📄 Visualizar PDF Assinado</Button>
            </a>
          </div>
        )}
      </div>
    </>
  )
}
