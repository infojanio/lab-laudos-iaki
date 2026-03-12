import { useQuery } from '@tanstack/react-query'
import { parameterService } from '@/services/parameterService'
import { Link } from 'react-router-dom'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Plus } from 'lucide-react'

export default function ParametersList() {
  const { data, isLoading } = useQuery({
    queryKey: ['parameters'],
    queryFn: parameterService.getParameters,
  })

  const parameters = data ?? []

  if (isLoading) {
    return <div className="p-10 text-center">Carregando parâmetros...</div>
  }

  return (
    <div className="container py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Biblioteca de Parâmetros</h1>

        <Link to="/admin/parameters/new">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Novo parâmetro
          </Button>
        </Link>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parâmetro</TableHead>
              <TableHead>Seção</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>VMP</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {parameters.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>

                <TableCell>
                  {p.section === 'FISICO_QUIMICO'
                    ? 'Físico-químico'
                    : 'Microbiológico'}
                </TableCell>

                <TableCell>{p.method ?? '—'}</TableCell>

                <TableCell>{p.vmp ?? '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
