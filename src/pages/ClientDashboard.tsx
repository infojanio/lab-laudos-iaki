import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useAuth } from "@/contexts/AuthContext";
import { reportService } from "@/services/reportService";
import { Report, AnalysisType, ANALYSIS_TYPE_LABELS } from "@/types";
import { ReportCard } from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Filter } from "lucide-react";

const ClientDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("all");

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== "client") {
      navigate("/cliente/login");
      return;
    }
    reportService.getClientReports(user.email).then((data) => {
      setReports(data);
      setLoading(false);
    });
  }, [isAuthenticated, user, navigate]);

  const filtered = typeFilter === "all" ? reports : reports.filter((r) => r.analysisType === typeFilter);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-2xl font-bold">Meus Laudos</h1>
              <p className="text-muted-foreground text-sm">Bem-vindo(a), {user?.name}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {(Object.entries(ANALYSIS_TYPE_LABELS) as [AnalysisType, string][]).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Carregando laudos...</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground">Nenhum laudo encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ClientDashboard;
