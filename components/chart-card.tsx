"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts"
import { TrendingUp, TrendingDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { exportChartToPNG } from "@/utils/export-utils"

interface ChartCardProps {
  title: string
  data: Array<{ name: string; value: number }>
  color: "red" | "green" | "blue" | "purple"
  type: "horizontal-bar" | "vertical-bar"
}

const colorMap = {
  red: "#EF4444",
  green: "#22C55E",
  blue: "#2563EB",
  purple: "#A855F7",
}

const backgroundColorMap = {
  red: "bg-red-50",
  green: "bg-green-50",
  blue: "bg-blue-50",
  purple: "bg-purple-50",
}

const CustomYAxisTick = ({ x, y, payload }: any) => {
  const maxChars = 25 // Increased from 20 to 25 characters
  const text = payload.value || ""
  const displayText = text.length > maxChars ? `${text.substring(0, maxChars)}...` : text

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={4}
        textAnchor="end"
        fill="#1e293b"
        fontSize={10}
        fontWeight={500}
        style={{ userSelect: "none" }}
      >
        <title>{text}</title>
        {displayText}
      </text>
    </g>
  )
}

const CustomXAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={10} textAnchor="end" fill="#1e293b" fontSize={12} fontWeight={500} transform="rotate(-45)">
        {payload.value}
      </text>
    </g>
  )
}

const renderCustomLabel = (props: any) => {
  const { x, y, width, height, value } = props
  return (
    <text
      x={x + width + 5}
      y={y + height / 2}
      fill="#1e293b"
      textAnchor="start"
      dominantBaseline="middle"
      fontSize={11}
      fontWeight={600}
    >
      {`${value.toFixed(1)}h`}
    </text>
  )
}

const renderCustomLabelVertical = (props: any) => {
  const { x, y, width, value } = props
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="#1e293b"
      textAnchor="middle"
      dominantBaseline="bottom"
      fontSize={12}
      fontWeight={600}
    >
      {`${value.toFixed(1)}h`}
    </text>
  )
}

export function ChartCard({ title, data, color, type }: ChartCardProps) {
  const handleExportChart = () => {
    const chartElement = document.getElementById(`chart-${title.replace(/\s+/g, "-")}`)
    if (chartElement) {
      exportChartToPNG(chartElement, title)
    }
  }

  const isEmpty = !data || data.length === 0
  const isNegative = title.includes("Negativas")

  return (
    <div className={`${backgroundColorMap[color]} rounded-xl border border-gray-200 p-2`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {isNegative ? (
            <TrendingDown className="w-5 h-5 text-gray-700" />
          ) : (
            <TrendingUp className="w-5 h-5 text-gray-700" />
          )}
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        </div>
        {!isEmpty && (
          <Button variant="ghost" size="sm" onClick={handleExportChart} className="gap-2 h-8">
            <Download className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div id={`chart-${title.replace(/\s+/g, "-")}`} className="w-full">
        {isEmpty ? (
          <div className="h-[480px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Nenhum dado disponível</p>
            </div>
          </div>
        ) : type === "horizontal-bar" ? (
          <ResponsiveContainer width="100%" height={480}>
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 25, left: 50, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={<CustomYAxisTick />} width={180} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
                formatter={(value: number) => [`${value.toFixed(1)}h`, ""]}
                labelStyle={{ fontWeight: 600, marginBottom: 4 }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} fill={colorMap[color]}>
                <LabelList dataKey="value" content={renderCustomLabel} />
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorMap[color]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={480}>
            <BarChart data={data} margin={{ top: 25, right: 20, left: 10, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" tick={<CustomXAxisTick />} height={100} interval={0} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
                formatter={(value: number) => [`${value.toFixed(1)}h`, ""]}
                labelStyle={{ fontWeight: 600, marginBottom: 4 }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} fill={colorMap[color]}>
                <LabelList dataKey="value" content={renderCustomLabelVertical} />
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorMap[color]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
