import { api } from '@/lib/axios'
import { User } from '@/types'

export const authService = {
  async loginAdmin(email: string, password: string): Promise<User | null> {
    try {
      console.log('LOGIN PAYLOAD', { email, password })
      const { data } = await api.post('/sessions', {
        email,
        password,
      })

      const { user, accessToken, refreshToken } = data

      if (!accessToken) {
        throw new Error('Token não retornado pela API')
      }

      // salva sessão
      localStorage.setItem('@lablaudos:token', accessToken)
      localStorage.setItem('@lablaudos:refreshToken', refreshToken)
      localStorage.setItem('@lablaudos:user', JSON.stringify(user))

      return user
    } catch (error) {
      console.error('AUTH LOGIN ERROR:', error)
      return null
    }
  },

  async loginClient(email: string): Promise<User | null> {
    try {
      const { data } = await api.post('/clients/sessions', {
        email,
      })

      const { user, accessToken, refreshToken } = data

      localStorage.setItem('@lablaudos:token', accessToken)
      localStorage.setItem('@lablaudos:refreshToken', refreshToken)
      localStorage.setItem('@lablaudos:user', JSON.stringify(user))

      return user
    } catch (error) {
      console.error('CLIENT LOGIN ERROR:', error)
      return null
    }
  },

  getStoredUser(): User | null {
    const user = localStorage.getItem('@lablaudos:user')
    if (!user) return null
    return JSON.parse(user)
  },

  async logout(): Promise<void> {
    localStorage.removeItem('@lablaudos:token')
    localStorage.removeItem('@lablaudos:refreshToken')
    localStorage.removeItem('@lablaudos:user')
  },
}
