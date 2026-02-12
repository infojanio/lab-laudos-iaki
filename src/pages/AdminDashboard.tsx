import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { reportService } from "@/services/reportService";
import { api } from "@/services/api";
import {
  Report,
  AnalysisType,
  ReportStatus,
  ANALYSIS_TYPE_LABELS,
  REPORT_STATUS_LABELS,
} from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  FlaskConical,
  LogOut,
  Edit,
  ExternalLink,
} from "lucide-react";

import { toast } from "sonner";

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newReport, setNewReport] = useState({
    code: "",
    clientId: "",
    analysisType: "agua" as AnalysisType,
    description: "",
    responsibleTechnician: "",
    technicianRegistration: "",
    sampleDate: "",
    issueDate: "",
    status: "em_analise" as ReportStatus,
  });

  // ======================================================
  // CARREGAR RELATÓRIOS (SEM PAGINAÇÃO – BACKEND ATUAL)
  // ======================================================

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await reportService.getAllReports();
      setReports(data);
    } catch {
      toast.error("Erro ao carregar laudos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }

    loadReports();
  }, []);

  // ======================================================
  // CRIAR RELATÓRIO
  // ======================================================

  const handleCreateReport = async () => {
    if (!pdfFile) {
      toast.error("Selecione um PDF.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("file", pdfFile);

      const upload = await api.post("/reports/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { pdfUrl } = upload.data;

      await reportService.createReport({
        ...newReport,
        pdfUrl,
      });

      toast.success("Laudo criado com sucesso!");
      setPdfFile(null);
      loadReports();
    } catch {
      toast.error("Erro ao criar laudo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ======================================================
  // 🔸 FASE 2 – Atualização de Status
  // Backend precisa implementar:
  // PATCH /reports/:id/status
  // ======================================================

  /*
  const handleStatusChange = async (reportId: string, newStatus: ReportStatus) => {
    await reportService.updateReportStatus(reportId, newStatus);
    loadReports();
  };
  */

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            <span className="font-display font-bold">LabMoura — Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Sair
          </Button>
        </div>
      </header>

      <main className="container py-8">

        {/* 🔸 FASE 2 – Filtro por data (depende backend) */}
        {/*
        <div className="flex gap-4 mb-6">
          <Input type="date" />
          <Input type="date" />
          <Button>Filtrar</Button>
        </div>
        */}

        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Emissão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Laudo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {reports.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.code}</TableCell>
                    <TableCell>{ANALYSIS_TYPE_LABELS[r.analysisType]}</TableCell>
                    <TableCell>
                      {new Date(r.issueDate).toLocaleDateString("pt-BR")}
                    </TableCell>

                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>

                    <TableCell>
                      {r.pdfUrl ? (
                        <a
                          href={r.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                        >
                          Visualizar
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      {/* 🔸 FASE 2 – Edição de status */}
                      {/*
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingReport(r.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 🔸 FASE 2 – Paginação (depende backend) */}
          {/*
          <div className="flex justify-between items-center p-4">
            <Button>Anterior</Button>
            <span>Página 1</span>
            <Button>Próxima</Button>
          </div>
          */}
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
