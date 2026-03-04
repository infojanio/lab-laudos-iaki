import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

import StepReport from "@/components/report-wizard/StepReport"
import StepClient from "@/components/report-wizard/StepClient"
import StepSample from "@/components/report-wizard/StepSample"
import StepPhysical from "@/components/report-wizard/StepPhysical"
import StepMicrobiological from "@/components/report-wizard/StepMicrobiological"
import StepReview from "@/components/report-wizard/StepReview"
import StepObservations from "@/components/report-wizard/StepObservations"

// ======================================================
// STEPS
// ======================================================

const steps = [
  "Identificação do Laudo",
  "Cliente",
  "Amostragem",
  "Físico-Químico",
  "Bacteriológico",
  "Observações",
  "Revisão",
]

// ======================================================
// TIPOS
// ======================================================

export interface ResultRow {
  parameter: string
  analysisDate: string
  result: string
  vmp: string
  method: string
}

export interface CreateReportWizardData {
  report: {
    reportNumber: string
    issueDate: string
    normativeReference: string
  }

  client: {
    name: string
    document: string
    address: string
    municipality: string
    phone: string
    email?: string
  }

  sample: {
    identification: string
    location: string
    latitude: string
    longitude: string
    collectionDate: string
    receivedDate: string
    collectorName: string
    weatherCondition: string
    ambientTemperature: string
  }

  physicalAnalysis: ResultRow[]
  bacteriologicalAnalysis: ResultRow[]

  observations: {
    useStandardText: boolean
    customText?: string
  }
}

// ======================================================
// COMPONENT
// ======================================================

export default function CreateReportWizard() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const [formData, setFormData] = useState<CreateReportWizardData>({
    report: {
      reportNumber: "",
      issueDate: "",
      normativeReference: "RESOLUÇÃO CONAMA 357/05",
    },

    client: {
      name: "",
      document: "",
      address: "",
      municipality: "",
      phone: "",
      email: "",
    },

    sample: {
      identification: "",
      location: "",
      latitude: "",
      longitude: "",
      collectionDate: "",
      receivedDate: "",
      collectorName: "",
      weatherCondition: "",
      ambientTemperature: "",
    },

    physicalAnalysis: [],
    bacteriologicalAnalysis: [],

    observations: {
      useStandardText: true,
      customText: "",
    },
  })

  const next = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))

  const back = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="container max-w-5xl py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Criar Relatório de Ensaio
      </h1>

      <Card className="p-8 space-y-6">

        {/* STEP 1 - IDENTIFICAÇÃO DO LAUDO */}
        {currentStep === 0 && (
          <StepReport
            data={formData.report}
            onChange={(report) =>
              setFormData((prev) => ({ ...prev, report }))
            }
          />
        )}

        {/* STEP 2 - CLIENTE */}
        {currentStep === 1 && (
          <StepClient
            data={formData.client}
            onChange={(client) =>
              setFormData((prev) => ({ ...prev, client }))
            }
          />
        )}

        {/* STEP 3 - AMOSTRAGEM */}
        {currentStep === 2 && (
          <StepSample
            data={formData.sample}
            onChange={(sample) =>
              setFormData((prev) => ({ ...prev, sample }))
            }
          />
        )}

        {/* STEP 4 - FÍSICO-QUÍMICO */}
        {currentStep === 3 && (
          <StepPhysical
            data={formData.physicalAnalysis}
            onChange={(physicalAnalysis) =>
              setFormData((prev) => ({
                ...prev,
                physicalAnalysis,
              }))
            }
          />
        )}

        {/* STEP 5 - BACTERIOLÓGICO */}
        {currentStep === 4 && (
          <StepMicrobiological
            data={formData.bacteriologicalAnalysis}
            onChange={(bacteriologicalAnalysis) =>
              setFormData((prev) => ({
                ...prev,
                bacteriologicalAnalysis,
              }))
            }
          />
        )}

        {/* STEP 6 - OBSERVAÇÕES */}
        {currentStep === 5 && (
  <StepObservations
    data={formData.observations}
    onChange={(observations) =>
      setFormData((prev) => ({
        ...prev,
        observations,
      }))
    }
  />
)}

        {/* STEP 7 - REVISÃO */}
        {currentStep === 6 && (
          <StepReview data={formData} />
        )}

        {/* Navegação */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            disabled={currentStep === 0}
            onClick={back}
          >
            Voltar
          </Button>

          <Button onClick={next}>
            {currentStep === steps.length - 1
              ? "Finalizar Relatório"
              : "Próximo"}
          </Button>
        </div>

      </Card>
    </div>
  )
}