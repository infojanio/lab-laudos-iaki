import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { clientService } from '@/services/clientService'
import { api } from '@/lib/axios'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ClientDetails() {
  const { id } = useParams()

  const { data: client } = useQuery({
    queryKey: ['client', id],
    queryFn: () => clientService.getClient(id!),
  })

  const { data: reports } = useQuery({
    queryKey: ['clientReports', id],
    queryFn: async () => {
      const res = await api.get(`/reports?clientId=${id}`)
      return res.data.reports
    },
  })

  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-2xl font-bold">{client?.name}</h1>

      <Card className="p-6 space-y-2">
        <p>
          <b>Documento:</b> {client?.document}
        </p>
        <p>
          <b>Email:</b> {client?.email}
        </p>
        <p>
          <b>Telefone:</b> {client?.phone}
        </p>
        <p>
          <b>Endereço:</b> {client?.address}
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="font-bold mb-4">Histórico de laudos</h2>

        {reports?.map((report: any) => (
          <div key={report.id}>
            <Link
              to={`/admin/reports/${report.id}`}
              className="text-primary hover:underline"
            >
              {report.code}
            </Link>
          </div>
        ))}
      </Card>

      <Link to={`/admin/clients/${id}/edit`}>
        <Button>Editar cliente</Button>
      </Link>
    </div>
  )
}
