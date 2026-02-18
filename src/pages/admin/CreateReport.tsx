import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, UploadCloud, FileText } from "lucide-react";
import React from "react";

import { reportService } from "@/services/reportService";
import { AnalysisType, ANALYSIS_TYPE_LABELS } from "@/types";

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

const schema = z.object({
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
      const { report } = await reportService.uploadPdf(pdfFile);

      toast.success("Laudo criado com sucesso!");
      navigate(`/reports/${report.id}`);
    } catch (error) {
      toast.error("Erro ao criar laudo.");
    }
  }

  return (
    <div className="container py-10 max-w-2xl">

      {/* HEADER */}
      <div className="mb-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar ao painel
        </Button>

        <h1 className="text-3xl font-bold">
          Criar Novo Laudo
        </h1>

        <p className="text-muted-foreground mt-2">
          O código do laudo será gerado automaticamente após o envio.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

{/* ================= DADOS DO LAUDO ================= */}
<Card className="p-6 space-y-6">
  <h2 className="text-lg font-semibold">
    Dados do Laudo
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {/* Tipo */}
    <div className="md:col-span-2">
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
        <p className="text-sm text-red-500 mt-1">
          {errors.analysisType.message}
        </p>
      )}
    </div>

    {/* Datas lado a lado */}
    <div>
      <label className="text-sm text-muted-foreground">
        Data da Coleta
      </label>
      <Input type="date" {...register("sampleDate")} />
      {errors.sampleDate && (
        <p className="text-sm text-red-500 mt-1">
          {errors.sampleDate.message}
        </p>
      )}
    </div>

    <div>
      <label className="text-sm text-muted-foreground">
        Data de Emissão
      </label>
      <Input type="date" {...register("issueDate")} />
      {errors.issueDate && (
        <p className="text-sm text-red-500 mt-1">
          {errors.issueDate.message}
        </p>
      )}
    </div>

  </div>
</Card>

{/* ================= DADOS TÉCNICOS ================= */}
<Card className="p-6 space-y-6">
  <h2 className="text-lg font-semibold">
    Dados Técnicos
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Input
        placeholder="Responsável Técnico"
        {...register("responsibleTechnician")}
      />
      {errors.responsibleTechnician && (
        <p className="text-sm text-red-500 mt-1">
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
        <p className="text-sm text-red-500 mt-1">
          {errors.technicianRegistration.message}
        </p>
      )}
    </div>
  </div>

  <textarea
    className="w-full border rounded-md p-3 text-sm"
    placeholder="Descrição do laudo (opcional)"
    {...register("description")}
  />
</Card>

{/* ================= UPLOAD ================= */}
<Card className="p-6 space-y-4">
  <h2 className="text-lg font-semibold">
    Upload do PDF
  </h2>

  <div
    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition"
    onClick={() =>
      document.getElementById("fileInput")?.click()
    }
  >
    <UploadCloud className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />

    {pdfFile ? (
      <div className="flex flex-col items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <p className="text-sm font-medium">
          {pdfFile.name}
        </p>
        <p className="text-xs text-muted-foreground">
          Arquivo pronto para envio
        </p>
      </div>
    ) : (
      <>
        <p className="text-sm font-medium">
          Clique para selecionar ou arraste o PDF
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Apenas arquivos PDF
        </p>
      </>
    )}
  </div>

  <input
    id="fileInput"
    type="file"
    accept="application/pdf"
    className="hidden"
    onChange={(e) =>
      setPdfFile(e.target.files?.[0] || null)
    }
  />
</Card>

{/* BOTÃO FINAL */}
<Button
  type="submit"
  className="w-full"
  disabled={isSubmitting}
>
  {isSubmitting ? "Enviando..." : "Criar Laudo"}
</Button>

</form>

    </div>
  );
};

export default CreateReport;
