import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StepSampleProps {
  data: {
    identification: string
    location: string
    latitude: string
    longitude: string
    collectionDate: string
    receivedDate: string
    collectorName: string
    weatherCondition: string
    ambientTemperature: string
  }
  onChange: (data: StepSampleProps["data"]) => void
}

export default function StepSample({
  data,
  onChange,
}: StepSampleProps) {
  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Informações da Amostragem
        </h2>
        <p className="text-sm text-muted-foreground">
          Preencha os dados técnicos da coleta conforme formulário oficial.
        </p>
      </div>

      {/* IDENTIFICAÇÃO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <Label>Identificação da Amostra</Label>
          <Input
            placeholder="Ex: Ponto 01 - Poço Artesiano"
            value={data.identification}
            onChange={(e) =>
              onChange({
                ...data,
                identification: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Local da Coleta</Label>
          <Input
            placeholder="Ex: Fazenda Santa Rita"
            value={data.location}
            onChange={(e) =>
              onChange({
                ...data,
                location: e.target.value,
              })
            }
          />
        </div>

      </div>

      {/* COORDENADAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <Label>Latitude</Label>
          <Input
            placeholder="-13.043905"
            value={data.latitude}
            onChange={(e) =>
              onChange({
                ...data,
                latitude: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Longitude</Label>
          <Input
            placeholder="-46.761996"
            value={data.longitude}
            onChange={(e) =>
              onChange({
                ...data,
                longitude: e.target.value,
              })
            }
          />
        </div>

      </div>

      {/* DATAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <Label>Data da Coleta</Label>
          <Input
            type="date"
            value={data.collectionDate}
            onChange={(e) =>
              onChange({
                ...data,
                collectionDate: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Data do Recebimento</Label>
          <Input
            type="date"
            value={data.receivedDate}
            onChange={(e) =>
              onChange({
                ...data,
                receivedDate: e.target.value,
              })
            }
          />
        </div>

      </div>

      {/* RESPONSÁVEL + CLIMA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <Label>Responsável pela Coleta</Label>
          <Input
            placeholder="Nome do coletor"
            value={data.collectorName}
            onChange={(e) =>
              onChange({
                ...data,
                collectorName: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Condição Climática</Label>
          <Select
            value={data.weatherCondition}
            onValueChange={(value) =>
              onChange({
                ...data,
                weatherCondition: value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Sem chuva">
                Sem chuva
              </SelectItem>
              <SelectItem value="Com chuva">
                Com chuva
              </SelectItem>
              <SelectItem value="Nublado">
                Nublado
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>

      {/* TEMPERATURA */}
      <div className="space-y-2 max-w-xs">
        <Label>Temperatura Ambiente (°C)</Label>
        <Input
          placeholder="Ex: 25"
          value={data.ambientTemperature}
          onChange={(e) =>
            onChange({
              ...data,
              ambientTemperature: e.target.value,
            })
          }
        />
      </div>

    </div>
  )
}