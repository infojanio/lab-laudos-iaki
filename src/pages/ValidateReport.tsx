import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode } from "lucide-react";

import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { reportService } from "@/services/reportService";

const schema = z.object({
  reportId: z.string().uuid("Informe um UUID válido do laudo"),
});

type FormData = z.infer<typeof schema>;

const ValidateReport = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleSearch(data: FormData) {
    try {
      const report = await reportService.getPublicReport(data.reportId);

      if (!report || !report.signedPdfUrl) {
        throw new Error();
      }

      // Redireciona para página pública oficial
      navigate(`/reports/${report.id}`);
    } catch {
      toast.error("Laudo não encontrado ou ainda não disponível.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <QrCode className="h-8 w-8 text-accent-foreground" />
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-bold">
              Validar Laudo
            </h1>

            <p className="text-muted-foreground mt-2">
              Digite a chave do laudo para verificar sua autenticidade.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="reportId">Chave do Laudo</Label>
              <Input
                id="reportId"
                placeholder="Ex: 07b63d21-730d-4a9d-9694-4eb7aa58acdf"
                {...register("reportId")}
              />

              {errors.reportId && (
                <p className="text-sm text-red-500">
                  {errors.reportId.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Buscando..." : "Acessar Laudo"}
            </Button>
          </form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ValidateReport;
