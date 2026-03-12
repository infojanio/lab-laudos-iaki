import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { clientService } from '@/services/clientService'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'

export default function StepClient({ data, onChange }: any) {
  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: clientService.getClients,
  })

  const [creating, setCreating] = useState(false)

  const [newClient, setNewClient] = useState({
    name: '',
    document: '',
    email: '',
  })

  const handleCreate = async () => {
    const client = await clientService.createClient(newClient)

    onChange({ clientId: client.id })

    setCreating(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Cliente</h2>

      {!creating && (
        <>
          <Select
            value={data?.clientId}
            onValueChange={(value) => onChange({ clientId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar cliente" />
            </SelectTrigger>

            <SelectContent>
              {clients?.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Criar novo cliente
          </Button>
        </>
      )}

      {creating && (
        <div className="space-y-3">
          <Input
            placeholder="Nome"
            value={newClient.name}
            onChange={(e) =>
              setNewClient({ ...newClient, name: e.target.value })
            }
          />

          <Input
            placeholder="CPF/CNPJ"
            value={newClient.document}
            onChange={(e) =>
              setNewClient({ ...newClient, document: e.target.value })
            }
          />

          <Input
            placeholder="Email"
            value={newClient.email}
            onChange={(e) =>
              setNewClient({ ...newClient, email: e.target.value })
            }
          />

          <Button onClick={handleCreate}>Salvar cliente</Button>
        </div>
      )}
    </div>
  )
}
