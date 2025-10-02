"use client"

import { useMemo, useState } from "react"
import { KPICard } from "@/components/kpi-card"
import { ChartCard } from "@/components/chart-card"
import { FilterPanel } from "@/components/filter-panel"
import { DataTable } from "@/components/data-table"
import { Users, Clock, TrendingUp, TrendingDown, Building2, Download, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { exportToPDF, exportToCSV } from "@/utils/export-utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DashboardProps {
  data: any[]
}

export function Dashboard({ data }: DashboardProps) {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    sector: "",
    cd: "",
    employee: "",
  })

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (filters.startDate && item.dataInicio) {
        const itemDate = new Date(item.dataInicio)
        const filterDate = new Date(filters.startDate)
        if (itemDate < filterDate) return false
      }

      if (filters.endDate && item.dataFechamento) {
        const itemDate = new Date(item.dataFechamento)
        const filterDate = new Date(filters.endDate)
        if (itemDate > filterDate) return false
      }

      if (filters.sector && item.setor !== filters.sector) return false
      if (filters.cd && item.filial !== filters.cd) return false
      if (filters.employee && !item.nome?.toLowerCase().includes(filters.employee.toLowerCase())) return false
      return true
    })
  }, [data, filters])

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalEmployees = filteredData.length
    const totalNegative = filteredData.reduce((sum, item) => sum + (item.negativeHours || 0), 0)
    const totalPositive = filteredData.reduce((sum, item) => sum + (item.saldoPositivo || 0), 0)
    const uniqueSectors = new Set(filteredData.map((item) => item.setor).filter(Boolean)).size

    return {
      totalEmployees,
      totalNegative: Math.abs(totalNegative),
      totalPositive,
      uniqueSectors,
    }
  }, [filteredData])

  // Prepare chart data
  const chartData = useMemo(() => {
    // Top 10 employees by negative hours
    const topNegativeEmployees = [...filteredData]
      .sort((a, b) => (b.negativeHours || 0) - (a.negativeHours || 0))
      .slice(0, 10)
      .map((item) => ({
        name: item.nome || "Sem nome",
        value: Math.abs(item.negativeHours || 0),
      }))

    // Top 10 employees by saldoPositivo
    const topPositiveEmployees = [...filteredData]
      .sort((a, b) => (b.saldoPositivo || 0) - (a.saldoPositivo || 0))
      .slice(0, 10)
      .map((item) => ({
        name: item.nome || "Sem nome",
        value: item.saldoPositivo || 0,
      }))

    // Aggregate by sector for negative hours
    const sectorNegative = filteredData.reduce(
      (acc, item) => {
        const sector = item.setor || "Sem setor"
        acc[sector] = (acc[sector] || 0) + Math.abs(item.negativeHours || 0)
        return acc
      },
      {} as Record<string, number>,
    )

    const topNegativeSectors = Object.entries(sectorNegative)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }))

    // Aggregate by sector for saldoPositivo
    const sectorPositive = filteredData.reduce(
      (acc, item) => {
        const sector = item.setor || "Sem setor"
        acc[sector] = (acc[sector] || 0) + (item.saldoPositivo || 0)
        return acc
      },
      {} as Record<string, number>,
    )

    const topPositiveSectors = Object.entries(sectorPositive)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }))

    return {
      topNegativeEmployees,
      topPositiveEmployees,
      topNegativeSectors,
      topPositiveSectors,
    }
  }, [filteredData])

  const handleExportPDF = () => {
    exportToPDF(filteredData, kpis, chartData)
  }

  const handleExportCSV = () => {
    exportToCSV(filteredData, "timeanalytics-dados")
  }

  const hasData = data.length > 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard de Análise</h1>
          <p className="text-muted-foreground mt-1">Visualize e analise o banco de horas dos colaboradores</p>
        </div>
        {hasData && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Exportar Relatório
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportPDF}>
                <FileDown className="w-4 h-4 mr-2" />
                Exportar PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportCSV}>
                <FileDown className="w-4 h-4 mr-2" />
                Exportar CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {hasData ? (
        <>
          {/* Filters */}
          <FilterPanel data={data} filters={filters} onFiltersChange={setFilters} />

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard title="Total Colaboradores" value={kpis.totalEmployees} icon={Users} color="blue" />
            <KPICard
              title="Horas Negativas"
              value={`${kpis.totalNegative.toFixed(2)}h`}
              icon={TrendingDown}
              color="red"
            />
            <KPICard
              title="Horas Positivas"
              value={`${kpis.totalPositive.toFixed(2)}h`}
              icon={TrendingUp}
              color="green"
            />
            <KPICard title="Setores Ativos" value={kpis.uniqueSectors} icon={Building2} color="purple" />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Top 10 Colaboradores - Horas Negativas"
              data={chartData.topNegativeEmployees}
              color="red"
              type="horizontal-bar"
            />
            <ChartCard
              title="Top 10 Colaboradores - Horas Positivas"
              data={chartData.topPositiveEmployees}
              color="green"
              type="horizontal-bar"
            />
            <ChartCard
              title="Top 10 Setores - Horas Negativas"
              data={chartData.topNegativeSectors}
              color="red"
              type="vertical-bar"
            />
            <ChartCard
              title="Top 10 Setores - Horas Positivas"
              data={chartData.topPositiveSectors}
              color="green"
              type="vertical-bar"
            />
          </div>

          <DataTable data={filteredData} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Clock className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Nenhum dado disponível</h2>
          <p className="text-muted-foreground text-center max-w-md">
            Importe uma planilha de banco de horas para visualizar as análises e estatísticas
          </p>
        </div>
      )}
    </div>
  )
}
