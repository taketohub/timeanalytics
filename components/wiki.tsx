"use client"

import { FileSpreadsheet, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Wiki() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Wiki - Guia de Importação</h1>
        <p className="text-muted-foreground">Aprenda como estruturar sua planilha para importação no TimeAnalytics</p>
      </div>

      {/* Required Columns Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            <CardTitle>Colunas Obrigatórias</CardTitle>
          </div>
          <CardDescription>Sua planilha deve conter as seguintes colunas (exatamente com esses nomes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-green-900">Nome</p>
                  <p className="text-xs text-green-700">Nome completo do colaborador</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-green-900">Setor</p>
                  <p className="text-xs text-green-700">Departamento ou setor do colaborador</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-green-900">CD</p>
                  <p className="text-xs text-green-700">Centro de Distribuição</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-green-900">Data</p>
                  <p className="text-xs text-green-700">Data do registro (DD/MM/AAAA)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-blue-900">Saldo Negativo</p>
                  <p className="text-xs text-blue-700">Horas negativas no formato HH:MM ou decimal</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-blue-900">Saldo Positivo</p>
                  <p className="text-xs text-blue-700">Horas positivas no formato HH:MM ou decimal</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Format Examples Card */}
      <Card>
        <CardHeader>
          <CardTitle>Exemplos de Formato</CardTitle>
          <CardDescription>Veja como seus dados devem estar estruturados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left font-semibold">Nome</th>
                  <th className="border border-border p-2 text-left font-semibold">Setor</th>
                  <th className="border border-border p-2 text-left font-semibold">CD</th>
                  <th className="border border-border p-2 text-left font-semibold">Data</th>
                  <th className="border border-border p-2 text-left font-semibold">Saldo Negativo</th>
                  <th className="border border-border p-2 text-left font-semibold">Saldo Positivo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">João Silva Santos</td>
                  <td className="border border-border p-2">TI</td>
                  <td className="border border-border p-2">CD01</td>
                  <td className="border border-border p-2">15/01/2024</td>
                  <td className="border border-border p-2">2:30</td>
                  <td className="border border-border p-2">0:00</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Maria Oliveira Costa</td>
                  <td className="border border-border p-2">RH</td>
                  <td className="border border-border p-2">CD02</td>
                  <td className="border border-border p-2">16/01/2024</td>
                  <td className="border border-border p-2">0:00</td>
                  <td className="border border-border p-2">4:15</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Carlos Pereira Lima</td>
                  <td className="border border-border p-2">Financeiro</td>
                  <td className="border border-border p-2">CD01</td>
                  <td className="border border-border p-2">17/01/2024</td>
                  <td className="border border-border p-2">1:45</td>
                  <td className="border border-border p-2">3:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <CardTitle>Observações Importantes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Formato de Horas:</strong> Aceita tanto formato HH:MM (ex: 2:30)
                quanto decimal (ex: 2.5)
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Formato de Data:</strong> Use o formato DD/MM/AAAA (ex: 15/01/2024)
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Nomes das Colunas:</strong> Devem ser exatamente como mostrado acima
                (case-sensitive)
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Arquivos Aceitos:</strong> Excel (.xlsx, .xls) e CSV (.csv)
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Valores Vazios:</strong> Use 0:00 ou deixe em branco para horas
                zeradas
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Primeira Linha:</strong> Deve conter os cabeçalhos das colunas
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-primary">Dicas para Melhor Importação</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Remova linhas vazias ou com dados incompletos antes de importar
              </p>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">Verifique se não há espaços extras nos nomes das colunas</p>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Mantenha a consistência nos nomes de setores e CDs (evite variações como "TI" e "T.I.")
              </p>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Salve uma cópia de backup da planilha original antes de fazer alterações
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
