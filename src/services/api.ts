import {env} from "@/env"
import axios from "axios"


// Instância principal da API
export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

// 👉 Se você usar autenticação JWT depois,
// já deixamos preparado o interceptor:

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("labmoura_token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// 👉 Tratamento global de erro (opcional, mas recomendado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("labmoura_token")
      window.location.href = "/admin/login"
    }

    return Promise.reject(error)
  }
)
