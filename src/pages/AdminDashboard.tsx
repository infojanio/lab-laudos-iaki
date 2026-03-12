import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/axios'

import { Report, Client, ANALYSIS_TYPE_LABELS } from '@/types'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/StatusBadge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  FlaskConical,
  LogOut,
  ExternalLink,
  Plus,
  Users,
  FileText,
  Search,
} from 'lucide-react'

import { toast } from 'sonner'

const AdminDashboard = () => {
  const { signOut } = useAuth()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const { data, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const response = await api.get('/reports?page=1')
      return response.data.reports
    },
  })

  const reports: Report[] = data ?? []

  const clients: Client[] = Array.from(
    new Map(
      reports.filter((r) => r.client).map((r) => [r.client!.id, r.client]),
    ).values(),
  ) as Client[]

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchSearch =
        (r.code ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (r.client?.name ?? '').toLowerCase().includes(search.toLowerCase())

      const matchStatus = statusFilter === 'all' || r.status === statusFilter

      return matchSearch && matchStatus
    })
  }, [reports, search, statusFilter])

  const handleLogout = () => {
    signOut()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">LabMoura Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                Voltar ao site
              </Button>
            </Link>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        <Tabs defaultValue="reports">
          <TabsList>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-1" />
              Laudos
            </TabsTrigger>

            <TabsTrigger value="clients">
              <Users className="h-4 w-4 mr-1" />
              Clientes
            </TabsTrigger>
          </TabsList>

          {/* LAUDOS */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Laudos</h2>

              <div className="flex gap-3">
                <Link to="/admin/reports/new-upload">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Upload PDF
                  </Button>
                </Link>

                <Link to="/admin/reports/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Laudo Estruturado
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="flex items-center gap-2 w-full md:w-1/3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por código ou cliente..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Card>

            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Emissão</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>PDF</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredReports.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.code}</TableCell>
                        <TableCell>{r.client?.name ?? '—'}</TableCell>
                        <TableCell>
                          {ANALYSIS_TYPE_LABELS[r.analysisType]}
                        </TableCell>
                        <TableCell>
                          {new Date(r.issueDate).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={r.status} />
                        </TableCell>
                        <TableCell>
                          {r.signedPdfUrl ? (
                            <a
                              href={r.signedPdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                            >
                              Abrir
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            '—'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default AdminDashboard
