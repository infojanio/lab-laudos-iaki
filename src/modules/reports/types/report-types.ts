export interface ReportResultRow {
  id?: string
  section: string
  parameter: string
  result: string
  unit?: string
  method?: string
  vmp?: string
}

export interface ReportClient {
  id: string
  name?: string
  companyName?: string
  email?: string
  phone?: string
}

export interface Report {
  id: string
  code: string
  analysisType: string
  identification?: string
  location?: string
  createdAt: string
  client?: ReportClient
  results: ReportResultRow[]
}

export interface PaginatedReportsResponse {
  reports: Report[]
  meta?: {
    page: number
    total: number
    perPage: number
    totalPages: number
  }
}

export interface CreateReportRequest {
  analysisType: string
  identification?: string
  location?: string
  clientId?: string
  results: ReportResultRow[]
}
