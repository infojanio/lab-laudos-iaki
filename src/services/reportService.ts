import { api } from "./api";
import {
  Report,
  Client,
  ReportStatus,
  CreateReportDTO,
  UpdateReportStatusDTO,
  CreateClientDTO,
} from "@/types";

export const reportService = {

  // ======================================================
  // ===================== PUBLIC =========================
  // ======================================================

  /**
   * 🔹 Buscar relatório público por ID
   * Backend atual suporta:
   * GET /reports/:id
   */
  async getPublicReport(id: string): Promise<Report | null> {
    try {
      const response = await api.get(`/reports/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar laudo público:", error);
      return null;
    }
  },

  /**
   * 🔸 FASE 2 – Buscar por código
   * Backend precisa implementar:
   * GET /reports/code/:code
   */
  /*
  async validateReport(code: string): Promise<Report | null> {
    try {
      const response = await api.get(`/reports/code/${code}`);
      return response.data;
    } catch {
      return null;
    }
  },
  */


  // ======================================================
  // ===================== ADMIN ==========================
  // ======================================================

  /**
   * 🔹 Listar todos os relatórios
   * Backend atual suporta:
   * GET /reports
   */
  async getAllReports(): Promise<Report[]> {
    const response = await api.get("/reports");
    return response.data;
  },

  /**
   * 🔹 Criar relatório manualmente
   * Backend atual suporta:
   * POST /reports
   *
   * ⚠️ IMPORTANTE:
   * Hoje o upload de PDF já cria um relatório.
   * Avaliar na Fase 2 se essa rota continuará necessária.
   */
  async createReport(data: CreateReportDTO): Promise<Report> {
    const response = await api.post("/reports", data);
    return response.data;
  },

  /**
   * 🔹 Upload de PDF (etapa principal do fluxo atual)
   * Backend atual suporta:
   * POST /reports/upload-pdf
   *
   * Retorna:
   * {
   *   report: Report
   * }
   */
  async uploadPdf(file: File): Promise<{ report: Report }> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/reports/upload-pdf", formData);

    return response.data;
  },

  /**
   * 🔸 FASE 2 – Atualizar status do relatório
   * Backend precisa implementar:
   * PATCH /reports/:id/status
   */
  /*
  async updateReportStatus(
    id: string,
    data: UpdateReportStatusDTO
  ): Promise<Report> {
    const response = await api.patch(`/reports/${id}/status`, data);
    return response.data;
  },
  */


  // ======================================================
  // ===================== CLIENT =========================
  // ======================================================

  /**
   * 🔸 FASE 2 – Listar relatórios por cliente
   * Backend precisa implementar:
   * GET /clients/:email/reports
   */
  /*
  async getClientReports(email: string): Promise<Report[]> {
    const response = await api.get(`/clients/${email}/reports`);
    return response.data;
  },
  */


  /**
   * 🔸 FASE 2 – Listar todos os clientes
   * Backend precisa implementar:
   * GET /clients
   */
  /*
  async getAllClients(): Promise<Client[]> {
    const response = await api.get("/clients");
    return response.data;
  },
  */


  /**
   * 🔸 FASE 2 – Criar cliente
   * Backend precisa implementar:
   * POST /clients
   */
  /*
  async createClient(data: CreateClientDTO): Promise<Client> {
    const response = await api.post("/clients", data);
    return response.data;
  },
  */
};
