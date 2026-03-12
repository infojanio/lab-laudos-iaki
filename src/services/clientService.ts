import { api } from '@/lib/axios'
import { Client } from '@/types/client'

export const clientService = {
  async getClients(): Promise<Client[]> {
    const response = await api.get('/clients')
    return response.data.clients
  },

  async getClient(id: string): Promise<Client> {
    const response = await api.get(`/clients/${id}`)
    return response.data.client
  },

  async createClient(data: Partial<Client>): Promise<Client> {
    const response = await api.post('/clients', data)
    return response.data.client
  },

  async updateClient(id: string, data: Partial<Client>): Promise<Client> {
    const response = await api.put(`/clients/${id}`, data)
    return response.data.client
  },
}
