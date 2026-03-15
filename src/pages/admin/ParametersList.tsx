import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ParameterDeleteDialog } from '@/modules/parameters/components/ParameterDeleteDialog'
import { useDeleteParameter } from '@/modules/parameters/hooks/useDeleteParameter'
import { useParameters } from '@/modules/parameters/hooks/useParameters'

export function ParametersList() {
  const { data: parameters, isLoading } = useParameters()
  const { mutateAsync: deleteParameter, isPending: isDeleting } =
    useDeleteParameter()

  async function handleDelete(id: string) {
    try {
      await deleteParameter(id)
      toast.success('Parâmetro excluído com sucesso.')
    } catch {
      toast.error('Erro ao excluir parâmetro.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Parâmetros</h1>
        <Button asChild>
          <Link to="/parameters/new">Novo parâmetro</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Biblioteca de parâmetros</CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p>Carregando...</p>
          ) : !parameters?.length ? (
            <p>Nenhum parâmetro cadastrado.</p>
          ) : (
            <div className="space-y-4">
              {parameters.map((parameter) => (
                <div
                  key={parameter.id}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{parameter.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Seção:{' '}
                      {parameter.section === 'FISICO_QUIMICO'
                        ? 'Físico-químico'
                        : 'Microbiológico'}
                    </p>
                    {parameter.unit && (
                      <p className="text-sm text-muted-foreground">
                        Unidade: {parameter.unit}
                      </p>
                    )}
                    {parameter.method && (
                      <p className="text-sm text-muted-foreground">
                        Método: {parameter.method}
                      </p>
                    )}
                    {parameter.vmp && (
                      <p className="text-sm text-muted-foreground">
                        VMP: {parameter.vmp}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link to={`/parameters/${parameter.id}/edit`}>
                        Editar
                      </Link>
                    </Button>

                    <ParameterDeleteDialog
                      isLoading={isDeleting}
                      onConfirm={() => handleDelete(parameter.id)}
                    >
                      <Button variant="destructive">Excluir</Button>
                    </ParameterDeleteDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
