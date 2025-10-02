import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const oklchToHexMap: Record<string, string> = {
  "oklch(0.567 0.194 254.604)": "#2563EB", // Primary blue
  "oklch(0.729 0.188 145.495)": "#22C55E", // Green
  "oklch(0.628 0.258 27.325)": "#EF4444", // Red
  "oklch(0.678 0.217 305.349)": "#A855F7", // Purple
  "oklch(0.99 0 0)": "#FCFCFC", // Background
  "oklch(1 0 0)": "#FFFFFF", // White
  "oklch(0.2 0 0)": "#333333", // Dark text
  "oklch(0.92 0.005 0)": "#EBEBEB", // Border
  "oklch(0.975 0.005 0)": "#F9F9F9", // Muted
  "oklch(0.5 0 0)": "#808080", // Muted foreground
}

/**
 * Exporta os dados, KPIs e gráficos para um arquivo PDF
 * @param data Array com os dados dos colaboradores
 * @param kpis Objeto contendo os indicadores-chave de desempenho
 * @param chartData Dados dos gráficos para serem incluídos no relatório
 */
export async function exportToPDF(data: any[], kpis: any, chartData: any) {
  try {
    const pdf = new jsPDF("p", "mm", "a4")
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    let yPosition = 20

    // Header
    pdf.setFontSize(20)
    pdf.setTextColor(37, 99, 235) // Primary blue
    pdf.text("TimeAnalytics - Relatório de Banco de Horas", pageWidth / 2, yPosition, { align: "center" })

    yPosition += 15

    // Date
    pdf.setFontSize(10)
    pdf.setTextColor(100, 116, 139)
    pdf.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, pageWidth / 2, yPosition, { align: "center" })

    yPosition += 15

    // KPIs Section
    pdf.setFontSize(14)
    pdf.setTextColor(0, 0, 0)
    pdf.text("Resumo Geral", 20, yPosition)

    yPosition += 10

    pdf.setFontSize(10)
    pdf.text(`Total de Colaboradores: ${kpis.totalEmployees}`, 20, yPosition)
    yPosition += 7
    pdf.text(`Horas Negativas: ${kpis.totalNegative.toFixed(2)}h`, 20, yPosition)
    yPosition += 7
    pdf.text(`Horas Positivas: ${kpis.totalPositive.toFixed(2)}h`, 20, yPosition)
    yPosition += 7
    pdf.text(`Setores Ativos: ${kpis.uniqueSectors}`, 20, yPosition)

    yPosition += 15

    // Top Employees Section
    pdf.setFontSize(14)
    pdf.setTextColor(0, 0, 0)
    pdf.text("Top 5 Colaboradores - Horas Negativas", 20, yPosition)

    yPosition += 10

    pdf.setFontSize(9)
    chartData.topNegativeEmployees.slice(0, 5).forEach((item: any, index: number) => {
      pdf.text(`${index + 1}. ${item.name}: ${item.value.toFixed(2)}h`, 25, yPosition)
      yPosition += 6
    })

    yPosition += 10

    pdf.setFontSize(14)
    pdf.text("Top 5 Colaboradores - Horas Positivas", 20, yPosition)

    yPosition += 10

    pdf.setFontSize(9)
    chartData.topPositiveEmployees.slice(0, 5).forEach((item: any, index: number) => {
      pdf.text(`${index + 1}. ${item.name}: ${item.value.toFixed(2)}h`, 25, yPosition)
      yPosition += 6
    })

    // Save PDF
    pdf.save(`timeanalytics-relatorio-${new Date().toISOString().split("T")[0]}.pdf`)
  } catch (error) {
    console.error("Erro ao exportar PDF:", error)
    alert("Erro ao gerar PDF. Tente novamente.")
  }
}

/**
 * Exporta um gráfico específico para um arquivo PNG
 * @param element Elemento HTML contendo o gráfico
 * @param chartName Nome do gráfico para usar no nome do arquivo
 */
export async function exportChartToPNG(element: HTMLElement, chartName: string) {
  try {
    const clone = element.cloneNode(true) as HTMLElement
    document.body.appendChild(clone)
    clone.style.position = "absolute"
    clone.style.left = "-9999px"

    // Replace oklch colors in inline styles
    const allElements = clone.querySelectorAll("*")
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      const computedStyle = window.getComputedStyle(htmlEl)

      // Convert common properties that might use oklch
      const properties = ["color", "backgroundColor", "borderColor", "fill", "stroke"]
      properties.forEach((prop) => {
        const value = computedStyle.getPropertyValue(prop)
        if (value && value.includes("oklch")) {
          const hexColor = oklchToHexMap[value] || "#000000"
          htmlEl.style.setProperty(prop, hexColor)
        }
      })
    })

    const canvas = await html2canvas(clone, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    })

    document.body.removeChild(clone)

    const link = document.createElement("a")
    link.download = `${chartName.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  } catch (error) {
    console.error("Erro ao exportar gráfico:", error)
    alert("Erro ao exportar gráfico. Tente novamente.")
  }
}

/**
 * Exporta os dados para um arquivo CSV
 * @param data Array com os dados a serem exportados
 * @param filename Nome base do arquivo sem extensão
 */
export function exportToCSV(data: any[], filename: string) {
  try {
    if (data.length === 0) {
      alert("Nenhum dado para exportar")
      return
    }

    // Get headers from first object
    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            // Escape commas and quotes
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value
          })
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  } catch (error) {
    console.error("Erro ao exportar CSV:", error)
    alert("Erro ao exportar CSV. Tente novamente.")
  }
}
