import { CreateReportWizardData } from "@/pages/admin/CreateReportWizard"
import { Separator } from "@/components/ui/separator"

interface StepReviewProps {
  data: CreateReportWizardData
}

export default function StepReview({ data }: StepReviewProps) {
  return (
    <div className="space-y-8 bg-white p-10 rounded-md border shadow-sm text-sm">

      {/* ================= HEADER INSTITUCIONAL ================= */}
      <div className="flex justify-between items-start border-b pb-4">

        <div>
          <h2 className="text-lg font-bold">
            LABMOURA ANÁLISES AMBIENTAIS
          </h2>
          <p>CNPJ: 00.000.000/0001-00</p>
          <p>Campos Belos - GO</p>
        </div>

        <div className="text-right">
          <h3 className="font-semibold">
            RELATÓRIO DE ENSAIO
          </h3>
          <p>Nº {data.report.reportNumber}</p>
          <p>Emissão: {data.report.issueDate}</p>
        </div>

      </div>

      {/* ================= CLIENTE ================= */}
      <div>
        <h3 className="font-semibold mb-2">DADOS DO CLIENTE</h3>
        <div className="grid grid-cols-2 gap-2">
          <p><strong>Nome:</strong> {data.client.name}</p>
          <p><strong>Documento:</strong> {data.client.document}</p>
          <p><strong>Município:</strong> {data.client.municipality}</p>
          <p><strong>Telefone:</strong> {data.client.phone}</p>
          <p className="col-span-2">
            <strong>Endereço:</strong> {data.client.address}
          </p>
        </div>
      </div>

      <Separator />

      {/* ================= AMOSTRA ================= */}
      <div>
        <h3 className="font-semibold mb-2">DADOS DA AMOSTRA</h3>

        <div className="grid grid-cols-2 gap-2">
          <p><strong>Identificação:</strong> {data.sample.identification}</p>
          <p><strong>Local:</strong> {data.sample.location}</p>
          <p><strong>Latitude:</strong> {data.sample.latitude}</p>
          <p><strong>Longitude:</strong> {data.sample.longitude}</p>
          <p><strong>Data Coleta:</strong> {data.sample.collectionDate}</p>
          <p><strong>Recebimento:</strong> {data.sample.receivedDate}</p>
          <p><strong>Coletor:</strong> {data.sample.collectorName}</p>
          <p><strong>Clima:</strong> {data.sample.weatherCondition}</p>
          <p><strong>Temp. Ambiente:</strong> {data.sample.ambientTemperature} °C</p>
        </div>
      </div>

      <Separator />

      {/* ================= FÍSICO-QUÍMICO ================= */}
      {data.physicalAnalysis.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">
            ENSAIOS FÍSICO-QUÍMICOS
          </h3>

          <table className="w-full border text-xs">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Parâmetro</th>
                <th className="border p-2">Data</th>
                <th className="border p-2">Resultado</th>
                <th className="border p-2">VMP</th>
                <th className="border p-2">Método</th>
              </tr>
            </thead>
            <tbody>
              {data.physicalAnalysis.map((row, i) => (
                <tr key={i}>
                  <td className="border p-2">{row.parameter}</td>
                  <td className="border p-2 text-center">{row.analysisDate}</td>
                  <td className="border p-2 text-center">{row.result}</td>
                  <td className="border p-2 text-center">{row.vmp}</td>
                  <td className="border p-2 text-center">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MICROBIOLÓGICO ================= */}
      {data.bacteriologicalAnalysis.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">
            ENSAIOS BACTERIOLÓGICOS
          </h3>

          <table className="w-full border text-xs">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Parâmetro</th>
                <th className="border p-2">Data</th>
                <th className="border p-2">Resultado</th>
                <th className="border p-2">VMP</th>
                <th className="border p-2">Método</th>
              </tr>
            </thead>
            <tbody>
              {data.bacteriologicalAnalysis.map((row, i) => (
                <tr key={i}>
                  <td className="border p-2">{row.parameter}</td>
                  <td className="border p-2 text-center">{row.analysisDate}</td>
                  <td className="border p-2 text-center">{row.result}</td>
                  <td className="border p-2 text-center">{row.vmp}</td>
                  <td className="border p-2 text-center">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Separator />

      {/* ================= OBSERVAÇÕES ================= */}
      <div>
        <h3 className="font-semibold mb-2">OBSERVAÇÕES</h3>

        {data.observations.useStandardText ? (
          <p>
            Os resultados referem-se exclusivamente à amostra analisada.
            Este relatório só pode ser reproduzido na íntegra.
          </p>
        ) : (
          <p>{data.observations.customText}</p>
        )}
      </div>

      <Separator />

      {/* ================= RODAPÉ TÉCNICO ================= */}
      <div className="flex justify-between items-end pt-8">

        <div className="text-xs">
          <p>
            Referência normativa: {data.report.normativeReference}
          </p>
        </div>

        <div className="text-center">
          <div className="border-t pt-2 w-48">
            Responsável Técnico
          </div>
        </div>

      </div>

      {/* QR CODE (placeholder futuro) */}
      <div className="text-right text-xs pt-4">
        QR Code para validação pública (será inserido após geração do laudo)
      </div>

    </div>
  )
}