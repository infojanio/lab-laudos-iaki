import { useQuery } from '@tanstack/react-query'
import { superAdminService } from '@/services/superAdminService'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Building2, Users, FileText, UserRound, Plus } from 'lucide-react'

export default function SuperAdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['super-admin-dashboard'],
    queryFn: superAdminService.getDashboardStats,
  })

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">
            Visão geral da plataforma LabMoura
          </p>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/admin/users/new">
              <Plus className="mr-2 h-4 w-4" />
              Novo usuário
            </Link>
          </Button>

          <Button asChild>
            <Link to="/admin/stores/new">
              <Plus className="mr-2 h-4 w-4" />
              Novo laboratório
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Laboratórios</p>
              <p className="text-2xl font-bold">{data?.stores ?? 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Usuários</p>
              <p className="text-2xl font-bold">{data?.users ?? 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Laudos</p>
              <p className="text-2xl font-bold">{data?.reports ?? 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <UserRound className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Clientes</p>
              <p className="text-2xl font-bold">{data?.clients ?? 0}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
