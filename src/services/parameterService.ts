import { api } from '@/lib/axios'
import { Parameter } from '@/types/parameter'

export const parameterService = {
  async getParameters(): Promise<Parameter[]> {
    const res = await api.get('/parameters')
    return res.data.parameters
  },

  async createParameter(data: Partial<Parameter>): Promise<Parameter> {
    const res = await api.post('/parameters', data)
    return res.data.parameter
  },
}
