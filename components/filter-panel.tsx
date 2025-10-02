"use client"

import { useMemo } from "react"
import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

/**
 * Interface que define as propriedades do painel de filtros
 */
interface FilterPanelProps {
  /** Dados a serem filtrados */
  data: any[]
  /** Estado atual dos filtros */
  filters: {
    startDate: string
    endDate: string
    sector: string
    cd: string
    employee: string
  }
  /** Callback chamado quando os filtros são alterados */
  onFiltersChange: (filters: any) => void
}

/**
 * Componente que exibe um painel de filtros para os dados
 * Permite filtrar por período, setor, CD e colaborador
 */
export function FilterPanel({ data, filters, onFiltersChange }: FilterPanelProps) {
  // Extract unique values for dropdowns
  const uniqueValues = useMemo(() => {
    const sectors = new Set<string>()
    const cds = new Set<string>()

    data.forEach((item) => {
      if (item.setor) sectors.add(item.setor)
      if (item.filial) cds.add(item.filial)
    })

    return {
      sectors: Array.from(sectors).sort(),
      cds: Array.from(cds).sort(),
    }
  }, [data])

  const handleFilterChange = (key: string, value: string) => {
    const finalValue = value === "all" ? "" : value
    onFiltersChange({ ...filters, [key]: finalValue })
  }

  const clearFilters = () => {
    onFiltersChange({
      startDate: "",
      endDate: "",
      sector: "",
      cd: "",
      employee: "",
    })
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
      </div>

      <div className="flex flex-wrap items-end gap-3 text-justify">
        {/* Sector filter */}
        <div className="flex-1 min-w-[200px]">
          <Select value={filters.sector || "all"} onValueChange={(value) => handleFilterChange("sector", value)}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Todos os Setores" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Setores</SelectItem>
              {uniqueValues.sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* CD filter */}
        <div className="flex-1 min-w-[200px]">
          <Select value={filters.cd || "all"} onValueChange={(value) => handleFilterChange("cd", value)}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Todos os CDs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os CDs</SelectItem>
              {uniqueValues.cds.map((cd) => (
                <SelectItem key={cd} value={cd}>
                  {cd}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Employee search */}
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Colaborador..."
            value={filters.employee}
            onChange={(e) => handleFilterChange("employee", e.target.value)}
            className="h-10 pl-9"
          />
        </div>
      </div>
    </div>
  )
}
