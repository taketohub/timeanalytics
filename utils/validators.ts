export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateFileExtension(filename: string): ValidationResult {
  const validExtensions = [".xlsx", ".xls", ".csv"]
  const extension = filename.substring(filename.lastIndexOf(".")).toLowerCase()

  if (!validExtensions.includes(extension)) {
    return {
      isValid: false,
      errors: [`Formato de arquivo inválido. Use ${validExtensions.join(", ")}`],
    }
  }

  return { isValid: true, errors: [] }
}

export function validateRequiredColumns(data: any[]): ValidationResult {
  if (!data || data.length === 0) {
    return {
      isValid: false,
      errors: ["Arquivo vazio ou sem dados"],
    }
  }

  const requiredColumns = ["Nome do Colaborador", "Setor"]
  const firstRow = data[0]
  const missingColumns: string[] = []

  requiredColumns.forEach((col) => {
    if (!(col in firstRow)) {
      missingColumns.push(col)
    }
  })

  if (missingColumns.length > 0) {
    return {
      isValid: false,
      errors: [`Colunas obrigatórias ausentes: ${missingColumns.join(", ")}`],
    }
  }

  return { isValid: true, errors: [] }
}

export function validateHoursFormat(value: any): boolean {
  if (typeof value === "number") return !isNaN(value)
  if (typeof value === "string") {
    // Check for HH:MM format or numeric
    const timePattern = /^\d{1,3}:[0-5]\d$/
    const numericPattern = /^\d+(\.\d+)?$/
    return timePattern.test(value) || numericPattern.test(value)
  }
  return false
}

export function validateDateFormat(dateString: string): boolean {
  if (!dateString) return true // Optional field

  const date = new Date(dateString)
  return !isNaN(date.getTime())
}
