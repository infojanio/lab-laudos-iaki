import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Settings,
  LogOut,
  FlaskConical,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menu = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Laboratórios',
    href: '/admin/stores',
    icon: Building2,
  },
  {
    label: 'Usuários',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: 'Laudos',
    href: '/admin/reports',
    icon: FileText,
  },
  {
    label: 'Configurações',
    href: '/admin/settings',
    icon: Settings,
  },
]

export default function SuperAdminLayout() {
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r bg-white">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <FlaskConical className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold">LabMoura</p>
              <p className="text-xs text-muted-foreground">SUPER_ADMIN</p>
            </div>
          </div>

          <nav className="space-y-1 p-4">
            {menu.map((item) => {
              const Icon = item.icon
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div>
              <h1 className="text-lg font-semibold">Painel da Plataforma</h1>
              <p className="text-sm text-muted-foreground">
                Gerencie laboratórios, usuários e laudos
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>

              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </header>

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
