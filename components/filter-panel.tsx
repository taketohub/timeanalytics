"use client"

import { useMemo } from "react"
import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterPanelProps {
  data: any[]
  filters: {
    startDate: string
    endDate: string
    sector: string
    cd: string
    employee: string
  }
  onFiltersChange: (filters: any) => void
}

export function FilterPanel({ data, filters, onFiltersChange }: FilterPanelProps) {
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Sector filter */}
        <div className="w-full">
          <Select value={filters.sector || "all"} onValueChange={(value) => handleFilterChange("sector", value)}>
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Todos os Setores" />
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)]">
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
        <div className="w-full">
          <Select value={filters.cd || "all"} onValueChange={(value) => handleFilterChange("cd", value)}>
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Todos os CDs" />
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)]">
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
        <div className="w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Colaborador..."
            value={filters.employee}
            onChange={(e) => handleFilterChange("employee", e.target.value)}
            className="w-full h-10 pl-9"
          />
        </div>
      </div>
    </div>
  )
}