import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type AuthContextType = {
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  signIn: (token: string, refreshToken: string) => void
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('@lablaudos:token')
    const storedRefreshToken = localStorage.getItem('@lablaudos:refreshToken')

    if (storedToken) setToken(storedToken)
    if (storedRefreshToken) setRefreshToken(storedRefreshToken)
  }, [])

  function signIn(newToken: string, newRefreshToken: string) {
    localStorage.setItem('@lablaudos:token', newToken)
    localStorage.setItem('@lablaudos:refreshToken', newRefreshToken)

    setToken(newToken)
    setRefreshToken(newRefreshToken)
  }

  function signOut() {
    localStorage.removeItem('@lablaudos:token')
    localStorage.removeItem('@lablaudos:refreshToken')

    setToken(null)
    setRefreshToken(null)
  }

  const value = useMemo(
    () => ({
      token,
      refreshToken,
      isAuthenticated: !!token,
      signIn,
      signOut,
    }),
    [token, refreshToken],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
