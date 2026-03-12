import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import { ArrowLeft } from 'lucide-react'

import StepReport from '@/components/report-wizard/StepReport'
import StepClient from '@/components/report-wizard/StepClient'
import StepSample from '@/components/report-wizard/StepSample'
import StepPhysical from '@/components/report-wizard/StepPhysical'
import StepMicrobiological from '@/components/report-wizard/StepMicrobiological'
import StepReview from '@/components/report-wizard/StepReview'
import StepObservations from '@/components/report-wizard/StepObservations'

const steps = [
  'Identificação',
  'Cliente',
  'Amostra',
  'Físico-Químico',
  'Bacteriológico',
  'Observações',
  'Revisão',
]

export default function CreateReportWizard() {
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(0)

  const [formData, setFormData] = useState<any>({
    clientId: undefined,

    report: {
      reportNumber: '',
      issueDate: '',
      normativeReference: 'RESOLUÇÃO CONAMA 357/05',
    },

    sample: {},

    physicalAnalysis: [],
    bacteriologicalAnalysis: [],

    observations: {
      useStandardText: true,
      customText: '',
    },
  })

  // ================= SUBMIT =================

  const { mutateAsync: createReport, isPending } = useMutation({
    mutationFn: async () => {
      const results = [
        ...formData.physicalAnalysis.map((r: any) => ({
          section: 'FISICO_QUIMICO',
          parameter: r.parameter ?? '',
          result: r.result ?? '',
          unit: r.unit ?? '',
          method: r.method ?? '',
          vmp: r.vmp ?? '',
        })),

        ...formData.bacteriologicalAnalysis.map((r: any) => ({
          section: 'MICROBIOLOGICO',
          parameter: r.parameter ?? '',
          result: r.result ?? '',
          unit: r.unit ?? '',
          method: r.method ?? '',
          vmp: r.vmp ?? '',
        })),
      ]

      const payload = {
        clientId: formData.clientId,

        analysisType: 'AGUA',

        identification: formData.sample.identification ?? '',
        location: formData.sample.location ?? '',

        collectionAgent: formData.sample.collectorName ?? '',
        collectionTime: '',

        sampleDate: formData.sample.collectionDate ?? undefined,
        entryDate: formData.sample.receivedDate ?? undefined,

        results,
      }

      console.log('REPORT PAYLOAD:', payload)

      const response = await api.post('/reports', payload)

      return response.data
    },
  })

  const next = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))

  const back = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const handleSubmit = async () => {
    if (!formData.clientId) {
      toast.error('Selecione um cliente antes de finalizar.')
      setCurrentStep(1)
      return
    }

    try {
      await createReport()

      toast.success('Laudo criado com sucesso!')

      navigate('/admin')
    } catch (error: any) {
      console.error('CREATE REPORT ERROR:', error?.response?.data || error)

      toast.error(error?.response?.data?.message || 'Erro ao criar relatório.')
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="container max-w-5xl py-10">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Criar Relatório de Ensaio</h1>

      <Progress value={progress} className="mb-6" />

      <Card className="p-8 space-y-6">
        {currentStep === 0 && (
          <StepReport
            data={formData.report}
            onChange={(report: any) =>
              setFormData((prev: any) => ({ ...prev, report }))
            }
          />
        )}

        {currentStep === 1 && (
          <StepClient
            data={{ clientId: formData.clientId }}
            onChange={(client: any) =>
              setFormData((prev: any) => ({
                ...prev,
                clientId: client.clientId,
              }))
            }
          />
        )}

        {currentStep === 2 && (
          <StepSample
            data={formData.sample}
            onChange={(sample: any) =>
              setFormData((prev: any) => ({ ...prev, sample }))
            }
          />
        )}

        {currentStep === 3 && (
          <StepPhysical
            data={formData.physicalAnalysis}
            onChange={(physicalAnalysis: any) =>
              setFormData((prev: any) => ({
                ...prev,
                physicalAnalysis,
              }))
            }
          />
        )}

        {currentStep === 4 && (
          <StepMicrobiological
            data={formData.bacteriologicalAnalysis}
            onChange={(bacteriologicalAnalysis: any) =>
              setFormData((prev: any) => ({
                ...prev,
                bacteriologicalAnalysis,
              }))
            }
          />
        )}

        {currentStep === 5 && (
          <StepObservations
            data={formData.observations}
            onChange={(observations: any) =>
              setFormData((prev: any) => ({
                ...prev,
                observations,
              }))
            }
          />
        )}

        {currentStep === 6 && <StepReview data={formData} />}

        <div className="flex justify-between pt-6">
          <Button variant="outline" disabled={currentStep === 0} onClick={back}>
            Voltar
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Salvando...' : 'Finalizar Relatório'}
            </Button>
          ) : (
            <Button onClick={next}>Próximo</Button>
          )}
        </div>
      </Card>
    </div>
  )
}
