import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { reportService } from "@/services/reportService";
import { Report, Client, AnalysisType, ReportStatus, ANALYSIS_TYPE_LABELS, REPORT_STATUS_LABELS } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FlaskConical, Users, FileText, Plus, LogOut, BarChart3,
  Edit, UserPlus,
} from "lucide-react";

import { toast } from 'sonner'

//import { env } from '@/env'

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [reports, setReports] = useState<Report[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // New report form
  const [newReport, setNewReport] = useState({
    code: "", clientId: "", analysisType: "agua" as AnalysisType,
    description: "", responsibleTechnician: "", technicianRegistration: "",
    sampleDate: "", issueDate: "", status: "em_analise" as ReportStatus,
  });
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  // New client form
  const [newClient, setNewClient] = useState({ name: "", email: "", document: "", phone: "", company: "" });
  const [clientDialogOpen, setClientDialogOpen] = useState(false);

  // Status edit
  const [editingReport, setEditingReport] = useState<string | null>(null);

 //Upload do laudo pdf
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    Promise.all([reportService.getAllReports(), reportService.getAllClients()]).then(([r, c]) => {
      setReports(r);
      setClients(c);
      setLoading(false);
    });
  }, [isAuthenticated, user, navigate]);

  const handleCreateReport = async () => {

    if (!pdfFile) {
      toast.error('Por favor, selecione um arquivo PDF para enviar.')
      return
    }

    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append('file', pdfFile)

      const response = await fetch(`${env.VITE_API_URL}/reports/upload-pdf`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar o PDF')
      }

      const { id } = await response.json()

      toast.success('Laudo enviado com sucesso!', {
        action: {
          label: 'Ver Laudo',
          onClick: () => navigate(`/reports/${id}`),
        },
      })

      setPdfFile(null)
    } catch (error) {
      toast.error('Erro ao enviar o PDF.')
    } finally {
      setIsSubmitting(false)
    }



    if (!newReport.code || !newReport.clientId) return;
    const created = await reportService.createReport({
      ...newReport,
      pdfUrl: "#",
    });
    setReports((prev) => [{ ...created, client: clients.find((c) => c.id === created.clientId) }, ...prev]);
    setReportDialogOpen(false);
    setNewReport({ code: "", clientId: "", analysisType: "agua", description: "", responsibleTechnician: "", technicianRegistration: "", sampleDate: "", issueDate: "", status: "em_analise" });
  };

  const handleCreateClient = async () => {
    if (!newClient.name || !newClient.email) return;
    const created = await reportService.createClient(newClient);
    setClients((prev) => [created, ...prev]);
    setClientDialogOpen(false);
    setNewClient({ name: "", email: "", document: "", phone: "", company: "" });
  };

  const handleStatusChange = async (reportId: string, newStatus: ReportStatus) => {
    await reportService.updateReportStatus(reportId, newStatus);
    setReports((prev) => prev.map((r) => r.id === reportId ? { ...r, status: newStatus } : r));
    setEditingReport(null);
  };

  const handleLogout = () => { logout(); navigate("/"); };

  const stats = {
    total: reports.length,
    valid: reports.filter((r) => r.status === "valido").length,
    pending: reports.filter((r) => r.status === "em_analise").length,
    clients: clients.length,
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Carregando...</p></div>;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            <span className="font-display font-bold">LabMoura — Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">Ver site</Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="h-4 w-4 mr-1" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total de Laudos", value: stats.total, icon: FileText },
            { label: "Laudos Válidos", value: stats.valid, icon: BarChart3 },
            { label: "Em Análise", value: stats.pending, icon: FlaskConical },
            { label: "Clientes", value: stats.clients, icon: Users },
          ].map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <Icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-display">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="reports">
          <TabsList className="mb-6">
            <TabsTrigger value="reports"><FileText className="h-4 w-4 mr-1" /> Laudos</TabsTrigger>
            <TabsTrigger value="clients"><Users className="h-4 w-4 mr-1" /> Clientes</TabsTrigger>
          </TabsList>

          {/* REPORTS TAB */}
          <TabsContent value="reports">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Laudos</h2>
              <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Novo Laudo</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader><DialogTitle>Cadastrar Laudo</DialogTitle></DialogHeader>
                  <div className="space-y-3 pt-2">
                    <Input placeholder="Código (ex: LAB-2024-007)" value={newReport.code} onChange={(e) => setNewReport((p) => ({ ...p, code: e.target.value }))} />
                    <Select value={newReport.clientId} onValueChange={(v) => setNewReport((p) => ({ ...p, clientId: v }))}>
                      <SelectTrigger><SelectValue placeholder="Selecione o cliente" /></SelectTrigger>
                      <SelectContent>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                    </Select>
                    <Select value={newReport.analysisType} onValueChange={(v) => setNewReport((p) => ({ ...p, analysisType: v as AnalysisType }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{Object.entries(ANALYSIS_TYPE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                    </Select>
                    <Input placeholder="Descrição" value={newReport.description} onChange={(e) => setNewReport((p) => ({ ...p, description: e.target.value }))} />
                    <Input placeholder="Responsável técnico" value={newReport.responsibleTechnician} onChange={(e) => setNewReport((p) => ({ ...p, responsibleTechnician: e.target.value }))} />
                    <Input placeholder="Registro (CRQ/CREA)" value={newReport.technicianRegistration} onChange={(e) => setNewReport((p) => ({ ...p, technicianRegistration: e.target.value }))} />
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs text-muted-foreground">Data coleta</label><Input type="date" value={newReport.sampleDate} onChange={(e) => setNewReport((p) => ({ ...p, sampleDate: e.target.value }))} /></div>
                      <div><label className="text-xs text-muted-foreground">Data emissão</label><Input type="date" value={newReport.issueDate} onChange={(e) => setNewReport((p) => ({ ...p, issueDate: e.target.value }))} /></div>
                    </div>



                    <label
              htmlFor="upload"
              className="flex items-center justify-center h-32 w-full border border-dashed border-gray-400 rounded-md text-gray-500 hover:border-blue-500 hover:text-blue-600 transition cursor-pointer"
            >
              {pdfFile ? (
                <span className="text-sm">{pdfFile.name}</span>
              ) : (
                <span className="text-sm">
                  Clique aqui para selecionar o PDF
                </span>
              )}
            </label>

            <input
              id="upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPdfFile(e.target.files[0])
                }
              }}
            />
             </div>
             <Button
            className="w-full"
            disabled={isSubmitting || !pdfFile}
            onClick={handleCreateReport}
          >
            {isSubmitting ? 'Enviando...' : 'Salvar Laudo'}
          </Button>


                  
                </DialogContent>
              </Dialog>
            </div>

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
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.code}</TableCell>
                        <TableCell>{r.client?.name ?? "—"}</TableCell>
                        <TableCell>{ANALYSIS_TYPE_LABELS[r.analysisType]}</TableCell>
                        <TableCell>{new Date(r.issueDate).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          {editingReport === r.id ? (
                            <Select defaultValue={r.status} onValueChange={(v) => handleStatusChange(r.id, v as ReportStatus)}>
                              <SelectTrigger className="w-36 h-8"><SelectValue /></SelectTrigger>
                              <SelectContent>{Object.entries(REPORT_STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                            </Select>
                          ) : (
                            <StatusBadge status={r.status} />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setEditingReport(editingReport === r.id ? null : r.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* CLIENTS TAB */}
          <TabsContent value="clients">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Clientes</h2>
              <Dialog open={clientDialogOpen} onOpenChange={setClientDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm"><UserPlus className="h-4 w-4 mr-1" /> Novo Cliente</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Cadastrar Cliente</DialogTitle></DialogHeader>
                  <div className="space-y-3 pt-2">
                    <Input placeholder="Nome" value={newClient.name} onChange={(e) => setNewClient((p) => ({ ...p, name: e.target.value }))} />
                    <Input placeholder="E-mail" type="email" value={newClient.email} onChange={(e) => setNewClient((p) => ({ ...p, email: e.target.value }))} />
                    <Input placeholder="CPF / CNPJ" value={newClient.document} onChange={(e) => setNewClient((p) => ({ ...p, document: e.target.value }))} />
                    <Input placeholder="Telefone" value={newClient.phone} onChange={(e) => setNewClient((p) => ({ ...p, phone: e.target.value }))} />
                    <Input placeholder="Empresa (opcional)" value={newClient.company} onChange={(e) => setNewClient((p) => ({ ...p, company: e.target.value }))} />
                    <Button onClick={handleCreateClient} className="w-full">Cadastrar Cliente</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Empresa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell>{c.email}</TableCell>
                        <TableCell>{c.document}</TableCell>
                        <TableCell>{c.phone}</TableCell>
                        <TableCell>{c.company ?? "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
