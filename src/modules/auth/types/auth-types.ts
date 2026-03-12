export interface SessionResponse {
  token: string
  refreshToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthUser {
  token: string
  refreshToken: string
}
