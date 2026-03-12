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
import { AdminLogin } from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import ReportPublic from './pages/ReportPublic'
import CreateReport from './pages/admin/CreateReport'
import CreateReportWizard from './pages/admin/CreateReportWizard'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <HelmetProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/validar" element={<ValidateReport />} />
              <Route path="/cliente/login" element={<ClientLogin />} />
              <Route path="/cliente" element={<ClientDashboard />} />
              <Route path="/reports/:id" element={<ReportPublic />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create" element={<CreateReport />} />
              <Route
                path="/admin/reports/new-upload"
                element={<CreateReport />}
              />
              <Route
                path="/admin/reports/new"
                element={<CreateReportWizard />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
