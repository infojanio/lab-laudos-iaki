import { api } from "./api";
import { Report, Client, ReportStatus, CreateReportDTO } from "@/types";

export const reportService = {

  // ======================================================
  // PUBLIC
  // ======================================================

  /**
   * 🔹 Validação por ID
   * Backend atual suporta:
   * GET /reports/:id
   */
  async getPublicReport(id: string): Promise<Report | null> {
    try {
      const response = await api.get(`/reports/${id}`);
      return response.data;
    } catch {
      return null;
    }
  },

  /**
   * 🔸 FUTURO (backend precisa implementar)
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
  // CLIENT
  // ======================================================

  /**
   * 🔸 FUTURO (backend precisa implementar)
   * GET /clients/:email/reports
   */
  /*
  async getClientReports(email: string): Promise<Report[]> {
    const response = await api.get(`/clients/${email}/reports`);
    return response.data;
  },
  */


  // ======================================================
  // ADMIN
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
   * 🔸 FUTURO (backend precisa implementar)
   * GET /clients
   */
  /*
  async getAllClients(): Promise<Client[]> {
    const response = await api.get("/clients");
    return response.data;
  },
  */

  /**
   * 🔹 Criar relatório
   * Backend atual suporta:
   * POST /reports
   */
  async createReport(data: CreateReportDTO): Promise<Report> {
    const response = await api.post("/reports", data);
    return response.data;
  },
  
  /**
   * 🔸 FUTURO (backend precisa implementar)
   * PATCH /reports/:id/status
   */
  /*
  async updateReportStatus(
    id: string,
    status: ReportStatus
  ): Promise<Report | null> {
    const response = await api.patch(`/reports/${id}/status`, { status });
    return response.data;
  },
  */

  /**
   * 🔸 FUTURO (backend precisa implementar)
   * POST /clients
   */
  /*
  async createClient(
    data: Omit<Client, "id" | "createdAt" | "updatedAt">
  ): Promise<Client> {
    const response = await api.post("/clients", data);
    return response.data;
  },
  */

  /**
   * 🔹 Upload de PDF
   * Backend atual suporta:
   * POST /reports/upload-pdf
   */
  async uploadPdf(file: File): Promise<{ pdfUrl: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/reports/upload-pdf", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
};
