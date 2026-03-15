import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  roles?: Array<'SUPER_ADMIN' | 'ADMIN' | 'USER'>
}

export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()

  // enquanto carrega o contexto
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Carregando...
      </div>
    )
  }

  // não autenticado
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  // verifica role
  if (roles && user && !roles.includes(user.role)) {
    // redireciona baseado no perfil
    if (user.role === 'SUPER_ADMIN') {
      return <Navigate to="/admin" replace />
    }

    if (user.role === 'ADMIN') {
      return <Navigate to="/lab" replace />
    }

    return <Navigate to="/" replace />
  }

  return <Outlet />
}
