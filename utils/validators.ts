/**
 * Interface que define o resultado de uma validação
 */
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * Valida a extensão de um arquivo para garantir que seja um formato suportado (.xlsx, .xls, .csv)
 * @param filename Nome do arquivo a ser validado
 * @returns Objeto ValidationResult indicando se a extensão é válida
 */
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

/**
 * Valida se todas as colunas obrigatórias estão presentes nos dados
 * @param data Array com os dados importados da planilha
 * @returns Objeto ValidationResult indicando se todas as colunas necessárias estão presentes
 */
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

/**
 * Valida se um valor está no formato correto de horas (HH:MM)
 * @param value Valor a ser validado
 * @returns true se o formato estiver correto, false caso contrário
 */
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

/**
 * Valida se uma string está no formato correto de data (DD/MM/YYYY)
 * @param dateString String contendo a data a ser validada
 * @returns true se o formato estiver correto, false caso contrário
 */
export function validateDateFormat(dateString: string): boolean {
  if (!dateString) return true // Optional field

  const date = new Date(dateString)
  return !isNaN(date.getTime())
}
