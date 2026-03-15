import { Route } from 'react-router-dom'
import AdminLayout from '@/components/layout/AdminLayout'
import ClientsList from '@/pages/admin/ClientList'

import Dashboard from '@/pages/admin/Dashboard'
import { ReportListPage } from '@/pages/ListReports'
import { ParametersList } from '@/pages/admin/ParametersList'

export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<Dashboard />} />

    <Route path="reports" element={<ReportListPage />} />

    <Route path="clients" element={<ClientsList />} />

    <Route path="parameters" element={<ParametersList />} />
  </Route>
)
