"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { FileUpload } from "@/components/file-upload"
import { Dashboard } from "@/components/dashboard"
import { Wiki } from "@/components/wiki"

/**
 * Página inicial da aplicação
 * Gerencia a navegação entre as diferentes views:
 * - Dashboard: Visualização dos dados e análises
 * - Import: Upload de arquivos
 * - Wiki: Documentação e ajuda
 */
export default function Home() {
  const [currentView, setCurrentView] = useState<"dashboard" | "import" | "wiki">("import")
  const [data, setData] = useState<any[]>([])

  const handleDataImport = (importedData: any[]) => {
    setData(importedData)
    setCurrentView("dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col md:flex-row">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} totalRecords={data.length} />

      <main className="w-full min-h-screen p-4 md:p-8 md:ml-64">
        {currentView === "import" ? (
          <FileUpload onDataImport={handleDataImport} />
        ) : currentView === "wiki" ? (
          <Wiki />
        ) : (
          <Dashboard data={data} />
        )}
      </main>
    </div>
  )
}
