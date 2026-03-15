export interface Store {
  id: string
  name: string
  slug: string
  cnpj: string | null
  city: string | null
  state: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    users: number
    clients: number
    reports: number
    parameters: number
  }
}

export interface CreateStoreDTO {
  name: string
  slug: string
  cnpj?: string | null
  city?: string | null
  state?: string | null
  isActive?: boolean
}

export interface UpdateStoreDTO extends CreateStoreDTO {}
