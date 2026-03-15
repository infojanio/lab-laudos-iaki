import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FlaskConical,
  FileText,
  Users,
  TestTube,
  Settings,
} from 'lucide-react'

const menu = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin/dashboard',
  },
  {
    name: 'Amostras',
    icon: FlaskConical,
    path: '/admin/samples',
  },
  {
    name: 'Laudos',
    icon: FileText,
    path: '/admin/reports',
  },
  {
    name: 'Clientes',
    icon: Users,
    path: '/admin/clients',
  },
  {
    name: 'Parâmetros',
    icon: TestTube,
    path: '/admin/parameters',
  },
  {
    name: 'Configurações',
    icon: Settings,
    path: '/admin/settings',
  },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b font-bold text-lg">
        LabMoura
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:bg-muted'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
