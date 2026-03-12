import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { clientService } from '@/services/clientService'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function ClientCreate() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    document: '',
    email: '',
    phone: '',
    address: '',
    municipality: '',
  })

  const { mutateAsync } = useMutation({
    mutationFn: clientService.createClient,
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await mutateAsync(form)

    navigate('/admin/clients')
  }

  return (
    <div className="container max-w-xl py-10">
      <h1 className="text-2xl font-bold mb-6">Novo Cliente</h1>

      <Card className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="CPF / CNPJ"
            value={form.document}
            onChange={(e) => setForm({ ...form, document: e.target.value })}
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            placeholder="Telefone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <Input
            placeholder="Endereço"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <Input
            placeholder="Município"
            value={form.municipality}
            onChange={(e) => setForm({ ...form, municipality: e.target.value })}
          />

          <Button type="submit">Salvar cliente</Button>
        </form>
      </Card>
    </div>
  )
}
