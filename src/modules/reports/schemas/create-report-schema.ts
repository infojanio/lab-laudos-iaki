import { z } from 'zod'

export const reportResultSchema = z.object({
  section: z.string().min(1, 'Seção obrigatória'),
  parameter: z.string().min(1, 'Parâmetro obrigatório'),
  result: z.string().min(1, 'Resultado obrigatório'),
  unit: z.string().optional(),
  method: z.string().optional(),
  vmp: z.string().optional(),
})

export const createReportSchema = z.object({
  analysisType: z.string().min(1, 'Tipo de análise obrigatório'),
  identification: z.string().optional(),
  location: z.string().optional(),
  clientId: z.string().optional(),
  results: z.array(reportResultSchema).min(1, 'Informe ao menos um resultado'),
})

export type CreateReportSchema = z.infer<typeof createReportSchema>
