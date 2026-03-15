import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface ParameterDeleteDialogProps {
  onConfirm: () => void
  isLoading?: boolean
  children?: React.ReactNode
}

export function ParameterDeleteDialog({
  onConfirm,
  isLoading,
  children,
}: ParameterDeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ?? <Button variant="destructive">Excluir</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir parâmetro?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Excluindo...' : 'Confirmar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
