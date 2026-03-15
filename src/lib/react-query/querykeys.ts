export const queryKeys = {
  parameters: ['parameters'] as const,
  parameter: (id: string) => ['parameters', id] as const,
}
