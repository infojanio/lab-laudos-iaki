export type ReportSection = 'FISICO_QUIMICO' | 'MICROBIOLOGICO'

export interface Parameter {
  id: string
  storeId: string
  name: string
  unit: string | null
  method: string | null
  vmp: string | null
  section: ReportSection
  createdAt: string
  updatedAt: string
}

export interface CreateParameterDTO {
  name: string
  unit?: string | null
  method?: string | null
  vmp?: string | null
  section: ReportSection
}

export interface UpdateParameterDTO extends CreateParameterDTO {}
