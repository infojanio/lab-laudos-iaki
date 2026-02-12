import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { reportService } from "@/services/reportService";
import { api } from "@/services/api";
import {
  Report,
  Client,
  AnalysisType,
  ReportStatus,
  ANALYSIS_TYPE_LABELS,
  REPORT_STATUS_LABELS,
} from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  FlaskConical,
  Users,
  FileText,
  Plus,
  LogOut,
  BarChart3,
  Edit,
  UserPlus,
  ExternalLink,
} from "lucide-react";

import { toast } from "sonner";

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [reports, setReports] = useState<Report[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const limit = 10;

  const [editingReport, setEditingReport] = useState<string | null>(null);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);

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

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    document: "",
    phone: "",
    company: "",
  });

  const loadReports = async () => {
    setLoading(true);
    try {
      const response = await reportService.getAllReports({
        page,
        limit,
        startDate,
        endDate,
      });

      setReports(response.data);
      setTotalPages(response.totalPages);
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
    reportService.getAllClients().then(setClients);
  }, [page, startDate, endDate]);

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
      setReportDialogOpen(false);
      setPdfFile(null);
      loadReports();
    } catch {
      toast.error("Erro ao criar laudo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (reportId: string, newStatus: ReportStatus) => {
    await reportService.updateReportStatus(reportId, newStatus);
    loadReports();
    setEditingReport(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const stats = {
    total: reports.length,
    valid: reports.filter((r) => r.status === "valido").length,
    pending: reports.filter((r) => r.status === "em_analise").length,
    clients: clients.length,
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
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
              Ver site
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Filtro */}
        <div className="flex flex-wrap gap-4 mb-6 items-end">
          <div>
            <label className="text-xs text-muted-foreground">Data inicial</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Data final</label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <Button onClick={() => setPage(1)}>Filtrar</Button>
          <Button
            variant="outline"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setPage(1);
            }}
          >
            Limpar
          </Button>
        </div>

        {/* Tabela */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Cliente</TableHead>
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
                    <TableCell>{r.client?.name ?? "—"}</TableCell>
                    <TableCell>{ANALYSIS_TYPE_LABELS[r.analysisType]}</TableCell>
                    <TableCell>
                      {new Date(r.issueDate).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      {editingReport === r.id ? (
                        <Select
                          defaultValue={r.status}
                          onValueChange={(v) =>
                            handleStatusChange(r.id, v as ReportStatus)
                          }
                        >
                          <SelectTrigger className="w-36 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(REPORT_STATUS_LABELS).map(
                              ([k, v]) => (
                                <SelectItem key={k} value={k}>
                                  {v}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      ) : (
                        <StatusBadge status={r.status} />
                      )}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setEditingReport(editingReport === r.id ? null : r.id)
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginação */}
          <div className="flex justify-between items-center p-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </Button>

            <span className="text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Próxima
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
