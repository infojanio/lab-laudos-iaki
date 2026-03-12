import { useQuery } from '@tanstack/react-query'
import { clientService } from '@/services/clientService'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ClientSelector({
  value,
  onChange,
}: {
  value?: string
  onChange: (id: string) => void
}) {
  const { data } = useQuery({
    queryKey: ['clients'],
    queryFn: clientService.getClients,
  })

  const clients = data ?? []

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecionar cliente" />
      </SelectTrigger>

      <SelectContent>
        {clients.map((client) => (
          <SelectItem key={client.id} value={client.id}>
            {client.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
