import { PieChart, Pie, Cell, Tooltip } from 'recharts'

const data = [
  { name: 'Água', value: 60 },
  { name: 'Solo', value: 25 },
  { name: 'Efluente', value: 15 },
]

const colors = ['#6366f1', '#22c55e', '#f97316']

export default function AnalysisTypeChart() {
  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" outerRadius={100}>
        {data.map((entry, index) => (
          <Cell key={index} fill={colors[index]} />
        ))}
      </Pie>

      <Tooltip />
    </PieChart>
  )
}
