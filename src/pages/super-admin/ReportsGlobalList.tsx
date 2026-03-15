import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { superAdminService } from '@/services/superAdminService'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search } from 'lucide-react'

export default function ReportsGlobalList() {
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-global-reports'],
    queryFn: superAdminService.listReports,
  })

  const filteredReports = useMemo(() => {
    const term = search.toLowerCase()

    return (data ?? []).filter((report) => {
      return (
        (report.code ?? '').toLowerCase().includes(term) ||
        (report.identification ?? '').toLowerCase().includes(term) ||
        (report.analysisType ?? '').toLowerCase().includes(term) ||
        (report.store?.name ?? '').toLowerCase().includes(term) ||
        (report.client?.name ?? '').toLowerCase().includes(term)
      )
    })
  }, [data, search])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Laudos da plataforma</h2>
        <p className="text-muted-foreground">
          Visualize os laudos emitidos por todos os laboratórios
        </p>
      </div>

      <Card className="p-4">
        <div className="flex w-full items-center gap-2 md:w-96">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por código, cliente, laboratório ou tipo..."
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
                <TableHead>Laboratório</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Identificação</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredReports.length ? (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {report.code ?? '—'}
                    </TableCell>
                    <TableCell>{report.store?.name ?? '—'}</TableCell>
                    <TableCell>{report.client?.name ?? '—'}</TableCell>
                    <TableCell>{report.analysisType ?? '—'}</TableCell>
                    <TableCell>{report.identification ?? '—'}</TableCell>
                    <TableCell>
                      {new Date(report.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center">
                    Nenhum laudo encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
