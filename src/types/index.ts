// Types designed to mirror future Prisma schema

export type AnalysisType = "agua" | "solo" | "ambiental";

export type ReportStatus = "valido" | "substituido" | "cancelado" | "em_analise";

export interface Client {
  id: string;
  name: string;
  email: string;
  document: string; // CPF or CNPJ
  phone: string;
  company?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  code: string;
  clientId: string;
  client?: Client;
  analysisType: AnalysisType;
  status: ReportStatus;
  issueDate: string;
  sampleDate: string;
  responsibleTechnician: string;
  technicianRegistration: string;
  description: string;
  pdfUrl?: string;
  labName: string;
  createdAt: string;
  updatedAt: string;
}

//
export interface ReportRequest {
  id: string
  customerName: string
  address: string
  document: string
  phone: string
  email: string
  technicianName: string
  sampleOrigin: string
  sampleType: string
  identification?: string
  entryDate: string
  collectionDate: string
  collectionTime: string
  collectionAgent: string
  notes?: string
  analysisResults: Record<string, string>
  signedPdfUrl?: string
}


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

