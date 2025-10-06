"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { processExcelFile } from "@/utils/data-processor"

/**
 * Interface que define as propriedades do componente FileUpload
 */
interface FileUploadProps {
  /** Função callback chamada quando os dados são importados com sucesso */
  onDataImport: (data: any[]) => void
}

/**
 * Componente que permite o upload de arquivos Excel/CSV via drag-n-drop ou seleção
 * Processa os arquivos e chama o callback com os dados importados
 */
export function FileUpload({ onDataImport }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      await processFile(files[0])
    }
  }, [])

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await processFile(files[0])
    }
  }, [])

  const processFile = async (file: File) => {
    setError(null)
    setSuccess(false)
    setIsProcessing(true)

    try {
      // Validate file extension
      const validExtensions = [".xlsx", ".xls", ".csv"]
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()

      if (!validExtensions.includes(fileExtension)) {
        throw new Error("Formato de arquivo inválido. Use .xlsx, .xls ou .csv")
      }

      // Process the file
      const processedData = await processExcelFile(file)

      if (processedData.length === 0) {
        throw new Error("Nenhum dado válido encontrado no arquivo")
      }

      setSuccess(true)
      setTimeout(() => {
        onDataImport(processedData)
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar arquivo")
    } finally {
      setIsProcessing(false)
    }
  }

  const expectedColumns = [
    "Cadastro",
    "Nome do Colaborador",
    "Fantasia",
    "Setor",
    "Filial",
    "Cargo",
    "Cód. Cargo",
    "Saldo Negativo",
    "Saldo Positivo",
    "negativo (total)",
    "positivo (total)",
    "Data Início",
    "Data Fechamento",
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center sm:text-left">Importar Banco de Horas</h1>
        <p className="text-muted-foreground">
          Faça upload de uma planilha Excel ou CSV contendo os dados de banco de horas dos colaboradores
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-12 text-center transition-all
            ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
            ${isProcessing ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            disabled={isProcessing}
          />

          <div className="flex flex-col items-center gap-4">
            {isProcessing ? (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <FileSpreadsheet className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Processando dados...</p>
                  <p className="text-sm text-muted-foreground mt-1">Aguarde enquanto validamos o arquivo</p>
                </div>
              </>
            ) : success ? (
              <>
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <p className="text-lg font-medium text-accent">Arquivo processado com sucesso!</p>
                  <p className="text-sm text-muted-foreground mt-1">Redirecionando para o dashboard...</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Arraste e solte seu arquivo aqui</p>
                  <p className="text-sm text-muted-foreground mt-1">ou clique no botão abaixo para selecionar</p>
                </div>
                <Button asChild className="mt-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Selecionar Arquivo
                  </label>
                </Button>
                <p className="text-xs text-muted-foreground">Formatos aceitos: .xlsx, .xls, .csv</p>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">Erro ao processar arquivo</p>
              <p className="text-sm text-destructive/80 mt-1">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Expected Columns Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Colunas Esperadas</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Certifique-se de que sua planilha contém as seguintes colunas:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {expectedColumns.map((column) => (
            <div key={column} className="px-3 py-2 bg-muted/50 rounded-lg text-sm text-foreground border border-border">
              {column}
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Nota:</strong> As colunas "negativo (total)" e "positivo (total)" são
            obrigatórias para o cálculo das horas.
          </p>
        </div>
      </div>
    </div>
  )
}
