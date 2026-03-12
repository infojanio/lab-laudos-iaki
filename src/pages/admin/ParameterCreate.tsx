import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { parameterService } from '@/services/parameterService'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

export default function ParameterCreate() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    section: 'FISICO_QUIMICO',
    unit: '',
    method: '',
    vmp: '',
  })

  const { mutateAsync } = useMutation({
    mutationFn: parameterService.createParameter,
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await mutateAsync(form)

    navigate('/admin/parameters')
  }

  return (
    <div className="container max-w-xl py-10">
      <h1 className="text-2xl font-bold mb-6">Novo Parâmetro</h1>

      <Card className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Nome do parâmetro"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Select
            value={form.section}
            onValueChange={(v) => setForm({ ...form, section: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="FISICO_QUIMICO">Físico-químico</SelectItem>

              <SelectItem value="MICROBIOLOGICO">Microbiológico</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Unidade"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          />

          <Input
            placeholder="Método"
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}
          />

          <Input
            placeholder="VMP"
            value={form.vmp}
            onChange={(e) => setForm({ ...form, vmp: e.target.value })}
          />

          <Button type="submit">Salvar parâmetro</Button>
        </form>
      </Card>
    </div>
  )
}
