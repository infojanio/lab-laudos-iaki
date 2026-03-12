type Props = {
  status?: string
}

const STATUS_MAP: Record<string, { className: string; label: string }> = {
  valido: {
    className: 'bg-green-100 text-green-700',
    label: 'Válido',
  },
  em_analise: {
    className: 'bg-yellow-100 text-yellow-700',
    label: 'Em análise',
  },
  cancelado: {
    className: 'bg-red-100 text-red-700',
    label: 'Cancelado',
  },
}

export function StatusBadge({ status }: Props) {
  const config = STATUS_MAP[status ?? '']

  if (!config) {
    return (
      <span className="px-2 py-1 rounded text-xs bg-gray-200 text-gray-600">
        —
      </span>
    )
  }

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}
