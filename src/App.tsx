import { Toaster } from '@/components/ui/toaster'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'

import Index from './pages/Index'
import ValidateReport from './pages/ValidateReport'
import ClientLogin from './pages/ClientLogin'
import ClientDashboard from './pages/ClientDashboard'
import ReportPublic from './pages/ReportPublic'
import NotFound from './pages/NotFound'

import { AdminLogin } from './pages/AdminLogin'

import { ProtectedRoute } from './components/ProtectedRoute'

/* LAYOUTS */

import AdminLayout from './components/layout/AdminLayout'
import LabLayout from './components/layout/LabLayout'

/* SUPER ADMIN PAGES */

import SuperAdminDashboard from './pages/super-admin/Dashboard'
import StoresList from './pages/super-admin/StoresList'
import StoreCreate from './pages/super-admin/StoreCreate'
import StoreEdit from './pages/super-admin/StoreEdit'
import UsersList from './pages/super-admin/UsersList'
import UserCreate from './pages/super-admin/UserCreate'
import ReportsGlobalList from './pages/super-admin/ReportsGlobalList'
import Settings from './pages/super-admin/Settings'

/* LAB ADMIN PAGES */

import Dashboard from './pages/admin/Dashboard'

import ClientsList from './pages/admin/ClientList'
import ClientCreate from './pages/admin/ClientCreate'
import ClientDetails from './pages/admin/ClientDetails'
import ClientEdit from './pages/admin/ClientEdit'

import { ReportListPage } from './pages/ListReports'
import CreateReport from './pages/admin/CreateReport'
import CreateReportWizard from './pages/admin/CreateReportWizard'
import ReportDetails from './pages/admin/ReportDetails'

import { ParameterCreate } from './pages/admin/ParameterCreate'
import { ParameterEdit } from './pages/admin/ParameterEdit'
import { ParametersList } from './pages/admin/ParametersList'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <HelmetProvider>
          <Toaster />
          <Sonner />

          <AuthProvider>
            <Routes>
              {/* PUBLIC ROUTES */}

              <Route path="/" element={<Index />} />
              <Route path="/validar" element={<ValidateReport />} />
              <Route path="/reports/:id" element={<ReportPublic />} />

              <Route path="/cliente/login" element={<ClientLogin />} />
              <Route path="/cliente" element={<ClientDashboard />} />

              <Route path="/admin/login" element={<AdminLogin />} />

              {/* SUPER ADMIN */}

              <Route element={<ProtectedRoute roles={['SUPER_ADMIN']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<SuperAdminDashboard />} />
                  <Route path="dashboard" element={<SuperAdminDashboard />} />

                  <Route path="stores" element={<StoresList />} />
                  <Route path="stores/new" element={<StoreCreate />} />
                  <Route path="stores/:id/edit" element={<StoreEdit />} />

                  <Route path="users" element={<UsersList />} />
                  <Route path="users/new" element={<UserCreate />} />

                  <Route path="reports" element={<ReportsGlobalList />} />

                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>

              {/* LAB ADMIN */}

              <Route element={<ProtectedRoute roles={['ADMIN']} />}>
                <Route path="/lab" element={<LabLayout />}>
                  <Route index element={<Dashboard />} />

                  {/* CLIENTS */}

                  <Route path="clients" element={<ClientsList />} />
                  <Route path="clients/new" element={<ClientCreate />} />
                  <Route path="clients/:id" element={<ClientDetails />} />
                  <Route path="clients/:id/edit" element={<ClientEdit />} />

                  {/* PARAMETERS */}

                  <Route path="parameters" element={<ParametersList />} />
                  <Route path="parameters/new" element={<ParameterCreate />} />
                  <Route
                    path="parameters/:id/edit"
                    element={<ParameterEdit />}
                  />

                  {/* REPORTS */}

                  <Route path="reports" element={<ReportListPage />} />

                  <Route path="reports/new" element={<CreateReportWizard />} />

                  <Route path="reports/new-upload" element={<CreateReport />} />

                  <Route path="reports/:id" element={<ReportDetails />} />
                </Route>
              </Route>

              {/* NOT FOUND */}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </HelmetProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
