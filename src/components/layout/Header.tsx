import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { signOut } = useAuth()

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      <div className="font-medium">Painel administrativo</div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </header>
  )
}
