"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { FileUpload } from "@/components/file-upload"
import { Dashboard } from "@/components/dashboard"
import { Wiki } from "@/components/wiki"

export default function Home() {
  const [currentView, setCurrentView] = useState<"dashboard" | "import" | "wiki">("import")
  const [data, setData] = useState<any[]>([])

  const handleDataImport = (importedData: any[]) => {
    setData(importedData)
    setCurrentView("dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} totalRecords={data.length} />

      <main className="ml-64 min-h-screen p-8">
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
