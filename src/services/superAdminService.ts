import { api } from '@/lib/axios'
import { Store, CreateStoreDTO, UpdateStoreDTO } from '@/types/store'
import { AdminUser, CreateAdminUserDTO } from '@/types/admin-user'

export interface DashboardStats {
  stores: number
  users: number
  reports: number
  clients: number
}

export interface GlobalReport {
  id: string
  code: string | null
  analysisType: string | null
  identification: string | null
  createdAt: string
  store?: {
    id: string
    name: string
  } | null
  client?: {
    id: string
    name: string
  } | null
}

export const superAdminService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get('/admin/dashboard')
    return response.data
  },

  async listStores(search?: string): Promise<Store[]> {
    const response = await api.get('/admin/stores', {
      params: { search },
    })
    return response.data.stores
  },

  async getStoreById(id: string): Promise<Store> {
    const response = await api.get(`/admin/stores/${id}`)
    return response.data.store
  },

  async createStore(data: CreateStoreDTO): Promise<Store> {
    const response = await api.post('/admin/stores', data)
    return response.data.store
  },

  async updateStore(id: string, data: UpdateStoreDTO): Promise<Store> {
    const response = await api.put(`/admin/stores/${id}`, data)
    return response.data.store
  },

  async toggleStoreStatus(id: string): Promise<Store> {
    const response = await api.patch(`/admin/stores/${id}/status`)
    return response.data.store
  },

  async listUsers(search?: string): Promise<AdminUser[]> {
    const response = await api.get('/admin/users', {
      params: { search },
    })
    return response.data.users
  },

  async createUser(data: CreateAdminUserDTO): Promise<AdminUser> {
    const response = await api.post('/admin/users', data)
    return response.data.user
  },

  async listReports(): Promise<GlobalReport[]> {
    const response = await api.get('/admin/reports')
    return response.data.reports
  },
}
