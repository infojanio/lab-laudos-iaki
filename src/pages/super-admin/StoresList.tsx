import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import { Search, Plus, Pencil } from 'lucide-react'
import { toast } from 'sonner'

export default function StoresList() {
  const [search, setSearch] = useState('')
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-stores'],
    queryFn: () => superAdminService.listStores(),
  })

  const { mutateAsync: toggleStatus, isPending } = useMutation({
    mutationFn: superAdminService.toggleStoreStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stores'] })
    },
  })

  const filteredStores = useMemo(() => {
    const term = search.toLowerCase()

    return (data ?? []).filter((store) => {
      return (
        store.name.toLowerCase().includes(term) ||
        (store.slug ?? '').toLowerCase().includes(term) ||
        (store.city ?? '').toLowerCase().includes(term) ||
        (store.cnpj ?? '').toLowerCase().includes(term)
      )
    })
  }, [data, search])

  async function handleToggleStatus(id: string, current: boolean) {
    try {
      await toggleStatus(id)
      toast.success(
        current
          ? 'Laboratório desativado com sucesso.'
          : 'Laboratório ativado com sucesso.',
      )
    } catch {
      toast.error('Erro ao alterar status do laboratório.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Laboratórios</h2>
          <p className="text-muted-foreground">
            Gerencie os laboratórios da plataforma
          </p>
        </div>

        <Button asChild>
          <Link to="/admin/stores/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo laboratório
          </Link>
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex w-full items-center gap-2 md:w-96">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, slug, cidade ou CNPJ..."
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
                <TableHead>Slug</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usuários</TableHead>
                <TableHead>Clientes</TableHead>
                <TableHead>Laudos</TableHead>
                <TableHead className="w-[220px]">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredStores.length ? (
                filteredStores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell>{store.slug}</TableCell>
                    <TableCell>
                      {[store.city, store.state].filter(Boolean).join(' - ') ||
                        '—'}
                    </TableCell>
                    <TableCell>
                      {store.isActive ? (
                        <Badge>Ativo</Badge>
                      ) : (
                        <Badge variant="secondary">Inativo</Badge>
                      )}
                    </TableCell>
                    <TableCell>{store._count?.users ?? 0}</TableCell>
                    <TableCell>{store._count?.clients ?? 0}</TableCell>
                    <TableCell>{store._count?.reports ?? 0}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/admin/stores/${store.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </Button>

                        <Button
                          size="sm"
                          variant={store.isActive ? 'secondary' : 'default'}
                          disabled={isPending}
                          onClick={() =>
                            handleToggleStatus(store.id, store.isActive)
                          }
                        >
                          {store.isActive ? 'Desativar' : 'Ativar'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center">
                    Nenhum laboratório encontrado.
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
