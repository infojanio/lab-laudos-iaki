// ======================================================
// ENUMS
// ======================================================

export type AnalysisType = "agua" | "solo" | "ambiental";

export type ReportStatus =
  | "valido"
  | "substituido"
  | "cancelado"
  | "em_analise";

// ======================================================
// CORE ENTITIES (RETORNADAS PELO BACKEND)
// ======================================================

export interface Client {
  id: string;
  name: string;
  email: string;
  document: string;
  phone: string;
  company?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  code: string;
  clientId: string;
  analysisType: AnalysisType;
  description: string;
  responsibleTechnician: string;
  technicianRegistration: string;
  sampleDate: string;
  issueDate: string;
  status: ReportStatus;
  signedPdfUrl?: string;

  createdAt?: string;
  updatedAt?: string;

  // 🔹 opcional para include do Prisma
  client?: Client;
}

// ======================================================
// DTOs (PAYLOADS DO FRONTEND)
// ======================================================

export interface CreateReportDTO {
  code: string;
  clientId: string;
  analysisType: AnalysisType;
  description: string;
  responsibleTechnician: string;
  technicianRegistration: string;
  sampleDate: string;
  issueDate: string;
  status: ReportStatus;
  pdfUrl?: string;
}

export interface UpdateReportStatusDTO {
  status: ReportStatus;
}

export interface CreateClientDTO {
  name: string;
  email: string;
  document: string;
  phone: string;
  company?: string;
}

// ======================================================
// REQUEST MODELS (USADOS PARA FORMULÁRIOS COMPLEXOS)
// ======================================================
export interface ReportRequest {
  id: string;
  customerName: string;
  address: string;
  document: string;
  phone: string;
  email: string;
  technicianName: string;
  sampleOrigin: string;
  sampleType: string;
  identification?: string;
  entryDate: string;
  collectionDate: string;
  collectionTime: string;
  collectionAgent: string;
  notes?: string;
  analysisResults: Record<string, string>;
  signedPdfUrl?: string;
}

// ======================================================
// AUTH
// ======================================================
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "client";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ======================================================
// LABELS
// ======================================================
export const ANALYSIS_TYPE_LABELS: Record<AnalysisType, string> = {
  agua: "Análise de Água",
  solo: "Análise de Solo",
  ambiental: "Análise Ambiental",
};

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  valido: "Válido",
  substituido: "Substituído",
  cancelado: "Cancelado",
  em_analise: "Em Análise",
};
