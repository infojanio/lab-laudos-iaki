import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@lablaudos:token')

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('Token inválido ou expirado')

      localStorage.removeItem('@lablaudos:token')
      localStorage.removeItem('@lablaudos:refreshToken')
      localStorage.removeItem('@lablaudos:user')

      window.location.href = '/admin/login'
    }

    return Promise.reject(error)
  },
)
