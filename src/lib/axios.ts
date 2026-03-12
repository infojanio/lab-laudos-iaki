// src/lib/axios.ts
import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

// Interceptor para incluir token sempre antes da requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('🔐 Interceptor adicionando token:', token)
  } else {
    console.warn('⚠️ Interceptor: token não encontrado.')
  }

  return config
})

// 🔴 Interceptor de resposta para tratar erros 401 (não autorizado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn(
        "⚠️ Token expirado ou inválido. Redirecionando para login..." // prettier-ignore
      );

      localStorage.clear(); // remove tokens e user do storage
      window.location.href = "/sign-in"; // redireciona
    }

    return Promise.reject(error);
  }, // prettier-ignore
)
