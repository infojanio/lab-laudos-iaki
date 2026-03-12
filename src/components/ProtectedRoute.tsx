import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface Props {
  children: JSX.Element
}

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
