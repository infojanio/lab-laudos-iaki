import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createReport } from '@/api/create-report'

const signUpForm = z.object({
  customerName: z.string(),
  address: z.string(),
  document: z.string(),
  phone: z.string(),
  email: z.string().email(),
  technicianName: z.string(),
  sampleOrigin: z.string(),
  sampleType: z.string(),
  entryDate: z.string(),
  collectionDate: z.string(),
  collectionTime: z.string(),
  collectionAgent: z.string(),
  notes: z.string().optional(),
  analysisResults: z.record(z.string(), z.string()),
  signedPdfUrl: z.string().optional(),
  sampleImageUrls: z.array(z.string()).optional(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUpCad() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {
    console.log('Dados antes do envio:', data) // 👈 Adicione esta linha
    try {
      // Formatando os dados para o schema esperado
      const formattedData = {
        ...data,
        // Convertendo campos de análise para o formato record
        analysisResults: Object.fromEntries(
          Object.entries(data.analysisResults || {}).filter(
            ([_, value]) => value !== '',
          ),
        ),
        //  signedPdfUrl: '', // Será preenchido após geração do PDF
        // sampleImageUrls: [], // Pode ser preenchido posteriormente
      }

      await createReport(formattedData)

      toast.success('Laudo cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
      reset() // Limpa o formulário após envio
    } catch (error) {
      //console.error('Erro detalhado:', error.response?.data) // 👈 Mostra o erro do backend
      toast.error('Erro ao cadastrar o laudo.')
    }
  }

  // Campos de análise padrão
  const analysisFields = [
    { key: 'fluoreto', label: 'Fluoreto - máx. 1.5 mg/L' },
    { key: 'turbidez', label: 'Turbidez - máx. 5 uT (PRT GM/MS nº 888/21)' },
    {
      key: 'corAparente',
      label: 'Cor Aparente - máx. 15 uH (PRT GM/MS nº 888/21)',
    },
    { key: 'ph', label: 'pH - faixa 6.0 a 9.5' },
    { key: 'temperatura', label: 'Temperatura - monitoramento (°C)' },
    { key: 'alcalinidade', label: 'Alcalinidade - máx. 120 mg/L' },
    { key: 'durezaTotal', label: 'Dureza total - máx. 500 mg/L' },
    { key: 'durezaCalcio', label: 'Dureza de Cálcio - monitoramento (mg/L)' },
    {
      key: 'durezaMagnesio',
      label: 'Dureza de Magnésio - monitoramento (mg/L)',
    },
    { key: 'cloretos', label: 'Cloretos - máx. 250 mg/L' },
    {
      key: 'materiaOrganica',
      label: 'Matéria Orgânica - monitoramento (mg/L)',
    },
    { key: 'condutividade', label: 'Condutividade - máx. 100 µS/cm' },
    {
      key: 'solidosDissolvidos',
      label: 'Sólidos Totais Dissolvidos - máx. 1000 mg/L',
    },
    { key: 'aluminio', label: 'Alumínio - máx. 0.2 mg/L' },
    { key: 'ferro', label: 'Ferro - máx. 0.3 mg/L' },
    { key: 'manganes', label: 'Manganês - máx. 0.1 mg/L' },
    { key: 'amonia', label: 'Amônia / Nitrogênio Amoniacal - máx. 1.5 mg/L' },
    { key: 'fosforoTotal', label: 'Fósforo Total - máx. 0.1 mg/L' },
    { key: 'nitrato', label: 'Nitrato - máx. 10 mg/L' },
    { key: 'nitrito', label: 'Nitrito - máx. 1 mg/L' },
    { key: 'sulfato', label: 'Sulfato - máx. 250 mg/L' },
    {
      key: 'sulfetoHidrogenio',
      label: 'Sulfeto de Hidrogênio - máx. 0.002 mg/L',
    },
    { key: 'gasCarbonico', label: 'Gás Carbônico - monitoramento (mg/L)' },
    { key: 'sodio', label: 'Sódio - máx. 200 mg/L' },
    {
      key: 'coliformeTotal',
      label:
        'Índ.Coliforme Total - Presença em até 5% das amostras - N.M.P/100 mL - SMEWW 9222 B',
    },
    {
      key: 'escherichiaColi',
      label:
        'Índice de Escherichia Coli - Ausente - N.M.P/100 mL - SMEWW 9221 F',
    },
  ]

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-24">
        <Button variant="default" asChild className="absolute right-8 top-24">
          <Link to="/sign-in">Buscar resultado</Link>
        </Button>

        <div className="flex w-full max-w-3xl flex-col justify-center gap-6 mx-auto">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cadastrar Laudo de Amostra
            </h1>
            <p className="text-sm text-muted-foreground">
              Informe os dados do cliente, da amostra e os resultados das
              análises.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            {/* Dados do Cliente */}
            <div className="space-y-2">
              <Label htmlFor="customerName">Nome do Cliente</Label>
              <Input
                id="customerName"
                type="text"
                {...register('customerName', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                type="text"
                {...register('address', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document">CPF ou CNPJ</Label>
              <Input
                id="document"
                type="text"
                {...register('document', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technicianName">
                Nome do Técnico Responsável
              </Label>
              <Input
                id="technicianName"
                type="text"
                {...register('technicianName', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone', { required: true })}
              />
            </div>

            {/* Dados da Amostra */}
            <div className="space-y-2">
              <Label htmlFor="sampleOrigin">Origem da Amostra</Label>
              <Input
                id="sampleOrigin"
                type="text"
                {...register('sampleOrigin', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sampleType">Tipo de Amostra</Label>
              <Input
                id="sampleType"
                type="text"
                {...register('sampleType', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entryDate">Data de Entrada</Label>
              <Input
                id="entryDate"
                type="date"
                {...register('entryDate', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collectionDate">Data da Coleta</Label>
              <Input
                id="collectionDate"
                type="date"
                {...register('collectionDate', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collectionTime">Hora da Coleta</Label>
              <Input
                id="collectionTime"
                type="time"
                {...register('collectionTime', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collectionAgent">Responsável pela Coleta</Label>
              <Input
                id="collectionAgent"
                type="text"
                {...register('collectionAgent', { required: true })}
              />
            </div>

            {/* Resultados da Análise */}
            <div className="pt-4">
              <h2 className="text-lg font-semibold mb-2">
                Laudo de Análise Físico-Química da Água
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Preencha os campos com os resultados das análises.
              </p>

              {analysisFields.map((field) => (
                <div className="space-y-2" key={field.key}>
                  <Label htmlFor={`analysisResults.${field.key}`}>
                    {field.label}
                  </Label>
                  <Input
                    id={`analysisResults.${field.key}`}
                    type="text"
                    {...register(`analysisResults.${field.key}`)}
                  />
                </div>
              ))}

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea id="notes" {...register('notes')} />
              </div>
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Salvar Resultados
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="" className="underline underline-offset-4">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
