import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '@/lib/axios'

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER' | 'SUPER_ADMIN'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signOut: () => void
  signIn: (data: {
    user: User
    accessToken: string
    refreshToken: string
  }) => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('accessToken')

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser)

        setUser(parsedUser)

        api.defaults.headers.common.Authorization = `Bearer ${token}`
      } catch (error) {
        console.error('Erro ao recuperar usuário:', error)
        signOut()
      }
    }

    setIsLoading(false)
  }, [])

  function signOut() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')

    setUser(null)

    delete api.defaults.headers.common.Authorization

    navigate('/admin/login')
  }

  function signIn({
    user,
    accessToken,
    refreshToken,
  }: {
    user: User
    accessToken: string
    refreshToken: string
  }) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('user', JSON.stringify(user))

    setUser(user)

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    // 🔹 redirecionamento automático por role
    if (user.role === 'SUPER_ADMIN') {
      navigate('/admin')
      return
    }

    if (user.role === 'ADMIN') {
      navigate('/lab')
      return
    }

    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return context
}
