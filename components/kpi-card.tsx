"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Interface que define as propriedades do componente KPICard
 */
interface KPICardProps {
  /** Título do indicador */
  title: string
  /** Valor do indicador */
  value: string | number
  /** Ícone a ser exibido */
  icon: LucideIcon
  /** Esquema de cores do card */
  color: "blue" | "red" | "green" | "purple"
}

const colorClasses = {
  blue: {
    bg: "bg-primary/10",
    icon: "text-primary",
    border: "border-primary/20",
  },
  red: {
    bg: "bg-destructive/10",
    icon: "text-destructive",
    border: "border-destructive/20",
  },
  green: {
    bg: "bg-accent/10",
    icon: "text-accent",
    border: "border-accent/20",
  },
  purple: {
    bg: "bg-chart-4/10",
    icon: "text-chart-4",
    border: "border-chart-4/20",
  },
}

/**
 * Componente que exibe um card com indicador chave de performance (KPI)
 * @param props Propriedades do componente KPICard
 */
export function KPICard({ title, value, icon: Icon, color }: KPICardProps) {
  const colors = colorClasses[color]

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 transition-all hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center border", colors.bg, colors.border)}>
          <Icon className={cn("w-6 h-6", colors.icon)} />
        </div>
      </div>
    </div>
  )
}
