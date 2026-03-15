import { api } from '@/lib/axios'
import {
  CreateParameterDTO,
  Parameter,
  ReportSection,
  UpdateParameterDTO,
} from '@/types/parameter'

interface ListParametersParams {
  section?: ReportSection
  search?: string
}

export const parameterService = {
  async list(params?: ListParametersParams): Promise<Parameter[]> {
    const response = await api.get('/parameters', {
      params,
    })

    return response.data.parameters
  },

  async getById(id: string): Promise<Parameter> {
    const response = await api.get(`/parameters/${id}`)
    return response.data.parameter
  },

  async create(data: CreateParameterDTO): Promise<Parameter> {
    const response = await api.post('/parameters', data)
    return response.data.parameter
  },

  async update(id: string, data: UpdateParameterDTO): Promise<Parameter> {
    const response = await api.put(`/parameters/${id}`, data)
    return response.data.parameter
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/parameters/${id}`)
  },
}
