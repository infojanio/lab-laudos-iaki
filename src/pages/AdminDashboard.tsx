import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { reportService } from "@/services/reportService";
import {
  Report,
  Client,
  ANALYSIS_TYPE_LABELS,
} from "@/types";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
  ExternalLink,
  Plus,
  Users,
  FileText,
  Search,
} from "lucide-react";

import { toast } from "sonner";

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [reports, setReports] = useState<Report[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // ================= LOAD DATA =================

  const loadData = async () => {
    try {
      const data = await reportService.getAllReports();

      // Ordena por data mais recente
      const sorted = data.sort(
        (a, b) =>
          new Date(b.issueDate).getTime() -
          new Date(a.issueDate).getTime()
      );

      setReports(sorted);

      // Extrai clientes únicos dos relatórios
      const uniqueClients = Array.from(
        new Map(
          sorted
            .filter((r) => r.client)
            .map((r) => [r.client!.id, r.client])
        ).values()
      );

      setClients(uniqueClients as Client[]);
    } catch {
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }

    loadData();
  }, []);

  // ================= FILTRO =================

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchSearch =
        r.code.toLowerCase().includes(search.toLowerCase()) ||
        r.client?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || r.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [reports, search, statusFilter]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">LabMoura Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                Voltar ao site
              </Button>
            </Link>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">

        <Tabs defaultValue="reports">

          <TabsList>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-1" />
              Laudos
            </TabsTrigger>

            <TabsTrigger value="clients">
              <Users className="h-4 w-4 mr-1" />
              Clientes
            </TabsTrigger>
          </TabsList>

          {/* ================= LAUDOS ================= */}
          <TabsContent value="reports" className="space-y-6">

            {/* Header da Aba */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Laudos</h2>

              <Link to="/admin/create">
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Laudo
                </Button>
              </Link>
            </div>

            {/* FILTROS */}
            <Card className="p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="flex items-center gap-2 w-full md:w-1/3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por código ou cliente..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {["all", "valido", "em_analise", "cancelado"].map(
                  (status) => (
                    <Button
                      key={status}
                      variant={
                        statusFilter === status
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                    >
                      {status === "all"
                        ? "Todos"
                        : status.replace("_", " ")}
                    </Button>
                  )
                )}
              </div>
            </Card>

            {/* TABELA */}
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
                      <TableHead>PDF</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredReports.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.code}</TableCell>
                        <TableCell>
                          {r.client?.name ?? "—"}
                        </TableCell>
                        <TableCell>
                          {ANALYSIS_TYPE_LABELS[r.analysisType]}
                        </TableCell>
                        <TableCell>
                          {new Date(
                            r.issueDate
                          ).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={r.status} />
                        </TableCell>
                        <TableCell>
                          {r.signedPdfUrl ? (
                            <a
                              href={r.signedPdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                            >
                              Abrir
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

          </TabsContent>

          {/* ================= CLIENTES ================= */}
          <TabsContent value="clients" className="space-y-6">

            {/* Header da Aba */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Clientes</h2>

              <Link to="/admin/client/create">
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Cliente
                </Button>
              </Link>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Documento</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {clients.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.email}</TableCell>
                        <TableCell>{c.document}</TableCell>
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
