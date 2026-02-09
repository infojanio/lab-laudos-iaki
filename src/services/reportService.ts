/**
 * Report service - simulates API calls.
 * Replace implementations with real API calls when backend is ready.
 */

import { mockReports, mockClients } from "./mockData";
import { Report, Client, AnalysisType, ReportStatus } from "@/types";

// Simulate network delay
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

let reports = [...mockReports];
let clients = [...mockClients];

export const reportService = {
  // PUBLIC
  async validateReport(code: string): Promise<Report | null> {
    await delay(800);
    const report = reports.find((r) => r.code.toLowerCase() === code.toLowerCase());
    if (!report) return null;
    const client = clients.find((c) => c.id === report.clientId);
    return { ...report, client };
  },

  // CLIENT
  async getClientReports(email: string): Promise<Report[]> {
    await delay();
    const client = clients.find((c) => c.email === email);
    if (!client) return [];
    return reports
      .filter((r) => r.clientId === client.id)
      .map((r) => ({ ...r, client }));
  },

  // ADMIN
  async getAllReports(): Promise<Report[]> {
    await delay();
    return reports.map((r) => ({
      ...r,
      client: clients.find((c) => c.id === r.clientId),
    }));
  },

  async getAllClients(): Promise<Client[]> {
    await delay();
    return [...clients];
  },

  async createReport(data: Omit<Report, "id" | "createdAt" | "updatedAt" | "labName">): Promise<Report> {
    await delay();
    const newReport: Report = {
      ...data,
      id: `r${Date.now()}`,
      labName: "LabAnalytica",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    reports = [newReport, ...reports];
    return newReport;
  },

  async updateReportStatus(id: string, status: ReportStatus): Promise<Report | null> {
    await delay();
    const idx = reports.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    reports[idx] = { ...reports[idx], status, updatedAt: new Date().toISOString() };
    return reports[idx];
  },

  async createClient(data: Omit<Client, "id" | "createdAt" | "updatedAt">): Promise<Client> {
    await delay();
    const newClient: Client = {
      ...data,
      id: `c${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    clients = [newClient, ...clients];
    return newClient;
  },
};
