import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { superAdminService } from '@/services/superAdminService'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Plus } from 'lucide-react'

export default function UsersList() {
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => superAdminService.listUsers(),
  })

  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase()

    return (data ?? []).filter((user) => {
      return (
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        (user.store?.name ?? '').toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      )
    })
  }, [data, search])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Usuários</h2>
          <p className="text-muted-foreground">
            Gerencie os usuários administrativos da plataforma
          </p>
        </div>

        <Button asChild>
          <Link to="/admin/users/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo usuário
          </Link>
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex w-full items-center gap-2 md:w-96">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, e-mail, laboratório ou perfil..."
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
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Laboratório</TableHead>
                <TableHead>Cadastro</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === 'SUPER_ADMIN' ? 'default' : 'secondary'
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.store?.name ?? '—'}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    Nenhum usuário encontrado.
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
