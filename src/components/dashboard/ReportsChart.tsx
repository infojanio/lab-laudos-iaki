import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', reports: 12 },
  { month: 'Fev', reports: 19 },
  { month: 'Mar', reports: 25 },
  { month: 'Abr', reports: 32 },
]

export default function ReportsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="reports"
          stroke="#6366f1"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
