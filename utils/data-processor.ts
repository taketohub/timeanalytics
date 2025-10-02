import * as XLSX from "xlsx"

/**
 * Interface que define a estrutura dos dados brutos da planilha
 */
interface RawDataRow {
  Cadastro?: string | number
  "Nome do Colaborador"?: string
  Fantasia?: string
  Setor?: string
  Filial?: string
  Cargo?: string
  "Cód. Cargo"?: string | number
  "Saldo Negativo"?: string | number
  "Saldo Positivo"?: string | number
  "negativo (total)"?: string | number
  "positivo (total)"?: string | number
  "Data Início"?: string | number
  "Data Fechamento"?: string | number
}

/**
 * Interface que define a estrutura dos dados após o processamento
 */
interface ProcessedData {
  cadastro: string
  nome: string
  fantasia: string
  setor: string
  filial: string
  cargo: string
  codCargo: string
  saldoNegativo: number
  saldoPositivo: number
  negativeHours: number
  positiveHours: number
  dataInicio: string
  dataFechamento: string
}

/**
 * Converte um formato de tempo (HH:MM) para horas decimais
 * @param time Tempo no formato HH:MM, HH:MM:SS ou como número
 * @returns Número de horas em formato decimal
 */
function timeToDecimal(time: string | number): number {
  if (typeof time === "number") return time

  if (!time || typeof time !== "string") return 0

  // Handle formats like "10:30", "10h30", "10:30:00"
  const cleaned = time.toString().replace(/[hH]/g, ":")
  const parts = cleaned.split(":").map((p) => Number.parseFloat(p.trim()))

  if (parts.length >= 2) {
    const hours = parts[0] || 0
    const minutes = parts[1] || 0
    return hours + minutes / 60
  }

  // Try to parse as direct number
  const parsed = Number.parseFloat(time)
  return isNaN(parsed) ? 0 : parsed
}

/**
 * Processa um arquivo Excel ou CSV e retorna os dados formatados
 * @param file Arquivo a ser processado (Excel ou CSV)
 * @returns Array com os dados processados no formato ProcessedData
 */
export async function processExcelFile(file: File): Promise<ProcessedData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        if (!data) {
          throw new Error("Não foi possível ler o arquivo")
        }

        // Parse the workbook
        const workbook = XLSX.read(data, { type: "binary" })

        // Get first sheet
        const sheetName = workbook.SheetNames[0]
        if (!sheetName) {
          throw new Error("Planilha vazia ou inválida")
        }

        const worksheet = workbook.Sheets[sheetName]

        // Convert to JSON
        const jsonData: RawDataRow[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
          raw: false,
        })

        if (jsonData.length === 0) {
          throw new Error("Nenhum dado encontrado na planilha")
        }

        // Validate required columns
        const firstRow = jsonData[0]
        const requiredColumns = ["Nome do Colaborador", "Setor"]
        const missingColumns = requiredColumns.filter((col) => !(col in firstRow))

        if (missingColumns.length > 0) {
          throw new Error(`Colunas obrigatórias ausentes: ${missingColumns.join(", ")}`)
        }

        // Process each row
        const processedData: ProcessedData[] = jsonData
          .map((row, index) => {
            try {
              // Get negative and positive hours from the "total" columns
              const negativeTotal = row["negativo (total)"] || row["Saldo Negativo"] || 0
              const positiveTotal = row["positivo (total)"] || row["Saldo Positivo"] || 0

              return {
                cadastro: String(row["Cadastro"] || ""),
                nome: String(row["Nome do Colaborador"] || "").trim(),
                fantasia: String(row["Fantasia"] || "").trim(),
                setor: String(row["Setor"] || "").trim(),
                filial: String(row["Filial"] || "").trim(),
                cargo: String(row["Cargo"] || "").trim(),
                codCargo: String(row["Cód. Cargo"] || ""),
                saldoNegativo: timeToDecimal(row["Saldo Negativo"] || 0),
                saldoPositivo: timeToDecimal(row["Saldo Positivo"] || 0),
                negativeHours: timeToDecimal(negativeTotal),
                positiveHours: timeToDecimal(positiveTotal),
                dataInicio: String(row["Data Início"] || ""),
                dataFechamento: String(row["Data Fechamento"] || ""),
              }
            } catch (err) {
              console.warn(`Erro ao processar linha ${index + 2}:`, err)
              return null
            }
          })
          .filter((item): item is ProcessedData => item !== null)

        if (processedData.length === 0) {
          throw new Error("Nenhum dado válido foi processado")
        }

        resolve(processedData)
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Erro desconhecido ao processar arquivo"))
      }
    }

    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo"))
    }

    reader.readAsBinaryString(file)
  })
}
