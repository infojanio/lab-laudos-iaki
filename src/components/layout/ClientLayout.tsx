import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function ClientLayout() {
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
