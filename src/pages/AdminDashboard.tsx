import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/axios'

import { Report, ANALYSIS_TYPE_LABELS } from '@/types'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Plus,
  FileText,
  Search,
  MapPin,
  TestTube2,
  Users,
} from 'lucide-react'

const AdminDashboard = () => {
  const { signOut } = useAuth()

  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['reports', 1],
    queryFn: async () => {
      const response = await api.get('/reports?page=1')
      return response.data.reports
    },
  })

  const reports: Report[] = (data ?? []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const filteredReports = useMemo(() => {
    const searchTerm = search.toLowerCase()

    return reports.filter((r) => {
      return (
        (r.code ?? '').toLowerCase().includes(searchTerm) ||
        (r.identification ?? '').toLowerCase().includes(searchTerm) ||
        (r.location ?? '').toLowerCase().includes(searchTerm) ||
        (r.analysisType ?? '').toLowerCase().includes(searchTerm)
      )
    })
  }, [reports, search])

  const totalResults = useMemo(() => {
    return reports.reduce((acc, report) => {
      return acc + (report.results?.length ?? 0)
    }, 0)
  }, [reports])

  const uniqueClients = useMemo(() => {
    const set = new Set(reports.map((r) => r.clientId).filter(Boolean))

    return set.size
  }, [reports])

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
            <Link to="/admin/clients">
              <Button variant="outline" size="sm">
                Clientes
              </Button>
            </Link>

            <Link to="/admin/parameters">
              <Button variant="outline" size="sm">
                Parâmetros
              </Button>
            </Link>

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
        {/* CARDS DE MÉTRICAS */}

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total de laudos</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3">
              <TestTube2 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Resultados lançados
                </p>
                <p className="text-2xl font-bold">{totalResults}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Com localização</p>
                <p className="text-2xl font-bold">
                  {reports.filter((r) => !!r.location).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Clientes atendidos
                </p>
                <p className="text-2xl font-bold">{uniqueClients}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* TABS */}

        <Tabs defaultValue="reports">
          <TabsList>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-1" />
              Relatórios de ensaio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            {/* HEADER DA LISTA */}

            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Relatórios cadastrados</h2>

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

            {/* BUSCA */}

            <Card className="p-4">
              <div className="flex items-center gap-2 w-full md:w-1/3">
                <Search className="h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder="Buscar por código, identificação, local ou tipo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Card>

            {/* TABELA */}

            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Identificação</TableHead>
                      <TableHead>Local</TableHead>
                      <TableHead>Resultados</TableHead>
                      <TableHead>Cadastro</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredReports.length > 0 ? (
                      filteredReports.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">
                            <Link
                              to={`/admin/reports/${r.id}`}
                              className="text-primary hover:underline"
                            >
                              {r.code ?? '—'}
                            </Link>
                          </TableCell>

                          <TableCell>
                            {ANALYSIS_TYPE_LABELS?.[
                              r.analysisType as keyof typeof ANALYSIS_TYPE_LABELS
                            ] ??
                              r.analysisType ??
                              '—'}
                          </TableCell>

                          <TableCell>{r.identification ?? '—'}</TableCell>

                          <TableCell>{r.location ?? '—'}</TableCell>

                          <TableCell>{r.results?.length ?? 0}</TableCell>

                          <TableCell>
                            {r.createdAt
                              ? new Date(r.createdAt).toLocaleDateString(
                                  'pt-BR',
                                )
                              : '—'}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Nenhum relatório encontrado.
                        </TableCell>
                      </TableRow>
                    )}
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
