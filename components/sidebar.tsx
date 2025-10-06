"use client"

import { Clock, LayoutDashboard, Upload, FileText, User, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

/**
 * Interface que define as propriedades da barra lateral
 */
interface SidebarProps {
  /** View atual selecionada */
  currentView: "dashboard" | "import" | "wiki"
  /** Callback para mudança de view */
  onViewChange: (view: "dashboard" | "import" | "wiki") => void
  /** Número total de registros carregados */
  totalRecords: number
}

/**
 * Componente de barra lateral que permite navegação entre as diferentes views
 * Exibe o logo do sistema e status dos dados carregados
 */
export function Sidebar({ currentView, onViewChange, totalRecords }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  // Fecha o menu quando muda de view no mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [currentView, isMobile])

  // Fecha o menu quando redimensiona para desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [isMobile])

  const handleNavigation = (view: "dashboard" | "import" | "wiki") => {
    onViewChange(view)
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Botão do Menu Mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-background border border-border hover:bg-accent/50 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Overlay para fechar o menu no mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
        isMobile ? "w-[80%] max-w-[300px]" : "w-64",
        isMobile && !isOpen ? "-left-full" : "left-0"
      )}>
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground text-center sm:text-left">TimeAnalytics</h1>
            <p className="text-xs text-muted-foreground">Banco de Horas</p>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">Navegação</h2>
          <nav className="space-y-1">
            <button
              onClick={() => onViewChange("dashboard")}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                currentView === "dashboard"
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => onViewChange("import")}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                currentView === "import"
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Upload className="w-5 h-5" />
              Importar Dados
            </button>
            <button
              onClick={() => onViewChange("wiki")}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                currentView === "wiki"
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <FileText className="w-5 h-5" />
              Wiki
            </button>
          </nav>
        </div>

        {/* Quick Stats Section */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Estatísticas Rápidas
          </h2>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalRecords}</p>
                <p className="text-xs text-muted-foreground">Registros</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Usuário</p>
            <p className="text-xs text-muted-foreground truncate">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
    </>
  )
}
