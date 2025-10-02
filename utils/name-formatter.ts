/**
 * Retorna os dois primeiros nomes de um nome completo
 * Útil para exibição simplificada em interfaces onde o espaço é limitado
 * @param fullName Nome completo do colaborador
 * @returns Os dois primeiros nomes ou o nome único se houver apenas um
 */
export function getFirstTwoNames(fullName: string): string {
  if (!fullName) return ""

  const names = fullName.trim().split(/\s+/)

  if (names.length === 1) {
    return names[0]
  }

  return `${names[0]} ${names[1]}`
}
