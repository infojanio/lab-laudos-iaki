import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { ArrowLeft } from "lucide-react";

import { reportService } from "@/services/reportService";
import {
  AnalysisType,
  ReportStatus,
  ANALYSIS_TYPE_LABELS,
} from "@/types";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const schema = z.object({
  code: z.string().min(1, "Informe o código do laudo"),
  analysisType: z.enum(["agua", "solo", "ambiental"]),
  responsibleTechnician: z.string().min(1, "Informe o responsável técnico"),
  technicianRegistration: z.string().min(1, "Informe o registro profissional"),
  sampleDate: z.string().min(1, "Informe a data da coleta"),
  issueDate: z.string().min(1, "Informe a data de emissão"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CreateReport = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const analysisType = watch("analysisType");

  const [pdfFile, setPdfFile] = React.useState<File | null>(null);

  async function onSubmit(data: FormData) {
    if (!pdfFile) {
      toast.error("Selecione o PDF do laudo.");
      return;
    }

    try {
      // 🔥 FASE 1 — Backend atual
      const { report } = await reportService.uploadPdf(pdfFile);

      // ======================================================
      // 🔸 FASE 2 – Quando backend aceitar metadata completo
      // ======================================================
      /*
      await reportService.createReport({
        ...data,
        signedPdfUrl: report.signedPdfUrl,
        status: "em_analise" as ReportStatus,
      });
      */

      toast.success("Laudo criado com sucesso!");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar laudo.");
    }
  }

  return (
    <div className="container py-10 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
  <Button
    variant="outline"
    size="sm"
    onClick={() => navigate("/admin")}
  >
    <ArrowLeft className="h-4 w-4 mr-1" />
    Voltar
  </Button>
</div>

      <h1 className="text-2xl font-bold mb-8">
        Criar Novo Laudo
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6 space-y-6">

          {/* ================= DADOS DO LAUDO ================= */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Dados do Laudo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <Input
                  placeholder="Código do Laudo"
                  {...register("code")}
                />
                {errors.code && (
                  <p className="text-sm text-red-500">
                    {errors.code.message}
                  </p>
                )}
              </div>

              <div>
                <Select
                  value={analysisType}
                  onValueChange={(value) =>
                    setValue("analysisType", value as AnalysisType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de Análise" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ANALYSIS_TYPE_LABELS).map(
                      ([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                {errors.analysisType && (
                  <p className="text-sm text-red-500">
                    {errors.analysisType.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="date"
                  {...register("sampleDate")}
                />
                {errors.sampleDate && (
                  <p className="text-sm text-red-500">
                    {errors.sampleDate.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="date"
                  {...register("issueDate")}
                />
                {errors.issueDate && (
                  <p className="text-sm text-red-500">
                    {errors.issueDate.message}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* ================= DADOS TÉCNICOS ================= */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Dados Técnicos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <Input
                  placeholder="Responsável Técnico"
                  {...register("responsibleTechnician")}
                />
                {errors.responsibleTechnician && (
                  <p className="text-sm text-red-500">
                    {errors.responsibleTechnician.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Registro (CRQ / CREA)"
                  {...register("technicianRegistration")}
                />
                {errors.technicianRegistration && (
                  <p className="text-sm text-red-500">
                    {errors.technicianRegistration.message}
                  </p>
                )}
              </div>

            </div>

            <div className="mt-4">
              <textarea
                className="w-full border rounded-md p-3 text-sm"
                placeholder="Descrição do laudo (opcional)"
                {...register("description")}
              />
            </div>
          </div>

          {/* ================= UPLOAD ================= */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Upload do PDF
            </h2>

            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setPdfFile(e.target.files?.[0] || null)
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Criando..." : "Criar Laudo"}
          </Button>

        </Card>
      </form>
    </div>
  );
};

export default CreateReport;
