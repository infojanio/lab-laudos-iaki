import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

import { Card } from '@/components/ui/card'

import { FileText, Users, FlaskConical, TestTube2 } from 'lucide-react'
import AnalysisTypeChart from '@/components/dashboard/AnalysisTypeChart'
import ReportsChart from '@/components/dashboard/ReportsChart'

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await api.get('/dashboard')
      return response.data
    },
  })

  const stats = data ?? {
    reports: 0,
    samples: 0,
    clients: 0,
    results: 0,
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Laudos por mês</h2>

          <ReportsChart />
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Tipos de análise</h2>

          <AnalysisTypeChart />
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Laudos emitidos</p>
            <p className="text-3xl font-bold">{stats.reports}</p>
          </div>

          <FileText className="h-8 w-8 text-primary" />
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Amostras em análise</p>
            <p className="text-3xl font-bold">{stats.samples}</p>
          </div>

          <FlaskConical className="h-8 w-8 text-primary" />
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Clientes cadastrados
            </p>
            <p className="text-3xl font-bold">{stats.clients}</p>
          </div>

          <Users className="h-8 w-8 text-primary" />
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Resultados registrados
            </p>
            <p className="text-3xl font-bold">{stats.results}</p>
          </div>

          <TestTube2 className="h-8 w-8 text-primary" />
        </Card>
      </div>
    </div>
  )
}
