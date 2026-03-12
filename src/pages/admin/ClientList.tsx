import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { clientService } from '@/services/clientService'

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

import { Plus, ArrowLeft, Pencil } from 'lucide-react'

export default function ClientsList() {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: clientService.getClients,
  })

  const clients = data ?? []

  if (isLoading) {
    return (
      <div className="p-10 text-center">Carregando lista de clientes...</div>
    )
  }

  return (
    <div className="container py-10 space-y-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>

          <h1 className="text-2xl font-bold">Clientes</h1>
        </div>

        <Link to="/admin/clients/new">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Novo cliente
          </Button>
        </Link>
      </div>

      {/* LISTA */}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <Link
                      to={`/admin/clients/${client.id}`}
                      className="text-primary hover:underline"
                    >
                      {client.name}
                    </Link>
                  </TableCell>

                  <TableCell>{client.document ?? '—'}</TableCell>

                  <TableCell>{client.email ?? '—'}</TableCell>

                  <TableCell>{client.phone ?? '—'}</TableCell>

                  {/* AÇÕES */}

                  <TableCell>
                    <Link to={`/admin/clients/${client.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
