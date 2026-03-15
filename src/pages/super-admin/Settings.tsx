import { Card } from '@/components/ui/card'

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Configurações</h2>
        <p className="text-muted-foreground">
          Configurações gerais da plataforma
        </p>
      </div>

      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          Em breve: planos, limites, branding e parâmetros globais.
        </p>
      </Card>
    </div>
  )
}
