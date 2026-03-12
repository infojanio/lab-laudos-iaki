export interface Parameter {
  id: string
  name: string
  section: 'FISICO_QUIMICO' | 'MICROBIOLOGICO'
  unit?: string
  method?: string
  vmp?: string
  createdAt?: string
}
