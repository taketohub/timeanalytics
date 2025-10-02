export function getFirstTwoNames(fullName: string): string {
  if (!fullName) return ""

  const names = fullName.trim().split(/\s+/)

  if (names.length === 1) {
    return names[0]
  }

  return `${names[0]} ${names[1]}`
}
