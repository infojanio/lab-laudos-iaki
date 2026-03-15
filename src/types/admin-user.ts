export type Role = 'SUPER_ADMIN' | 'ADMIN'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: Role
  storeId: string | null
  store?: {
    id: string
    name: string
  } | null
  createdAt: string
}

export interface CreateAdminUserDTO {
  name: string
  email: string
  password: string
  role: Role
  storeId?: string | null
}
