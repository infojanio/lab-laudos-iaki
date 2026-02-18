import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import StepClient from "@/components/report-wizard/StepClient";
import StepSample from "@/components/report-wizard/StepSample";
import StepPhysical from "@/components/report-wizard/StepPhysical";

import StepReview from "@/components/report-wizard/StepReview";
import StepMicrobiological from "@/components/report-wizard/StepMicrobiological";

const steps = [
  "Cliente",
  "Amostra",
  "Físico-Químico",
  "Bacteriológico",
  "Revisão",
];

// ======================================================
// TIPOS
// ======================================================

export interface PhysicalRow {
  parameter: string;
  result: string;
  unit?: string;
  method?: string;
}

export interface MicroRow {
  parameter: string;
  result: string;
  unit?: string;
  method?: string;
}

export interface CreateReportWizardData {
  client: {
    name: string;
    document: string;
    email: string;
    phone: string;
    municipality: string;
    address: string;
  };

  sample: {
    identification: string;
    location: string;
    collectionDate: string;
    collectionTime: string;
    collectionAgent: string;
    entryDate: string;
  };

  physicalAnalysis: PhysicalRow[];

  bacteriologicalAnalysis: MicroRow[];
}

// ======================================================
// COMPONENT
// ======================================================

export default function CreateReportWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<CreateReportWizardData>({
    client: {
      name: "",
      document: "",
      email: "",
      phone: "",
      municipality: "",
      address: "",
    },
    sample: {
      identification: "",
      location: "",
      collectionDate: "",
      collectionTime: "",
      collectionAgent: "",
      entryDate: "",
    },
    physicalAnalysis: [],
    bacteriologicalAnalysis: [],
  });

  const next = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));

  const back = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="container max-w-4xl py-10">

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
        Criar Laudo Estruturado
      </h1>

      <Card className="p-8 space-y-6">

        {/* STEP 1 - CLIENTE */}
        {currentStep === 0 && (
          <StepClient
            data={formData.client}
            onChange={(client) =>
              setFormData((prev) => ({ ...prev, client }))
            }
          />
        )}

        {/* STEP 2 - AMOSTRA */}
        {currentStep === 1 && (
          <StepSample
            data={formData.sample}
            onChange={(sample) =>
              setFormData((prev) => ({ ...prev, sample }))
            }
          />
        )}

        {/* STEP 3 - FÍSICO-QUÍMICO */}
        {currentStep === 2 && (
          <StepPhysical
            data={formData.physicalAnalysis}
            onChange={(physicalAnalysis) =>
              setFormData((prev) => ({ ...prev, physicalAnalysis }))
            }
          />
        )}

        {/* STEP 4 - BACTERIOLÓGICO */}
        {currentStep === 3 && (
          <StepMicrobiological
            data={formData.bacteriologicalAnalysis}
            onChange={(bacteriologicalAnalysis) =>
              setFormData((prev) => ({ ...prev, bacteriologicalAnalysis }))
            }
          />
        )}

        {/* STEP 5 - REVISÃO */}
        {currentStep === 4 && (
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
              ? "Finalizar"
              : "Próximo"}
          </Button>
        </div>

      </Card>
    </div>
  );
}
