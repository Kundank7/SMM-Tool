import type React from "react"
export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <div className="recharts-wrapper">{children}</div>
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="recharts-container">{children}</div>
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <div className="recharts-tooltip">{children}</div>
}

export const ChartTooltipContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="recharts-tooltip-content">{children}</div>
}

export const ChartTooltipItem = () => {
  return <div className="recharts-tooltip-item"></div>
}

export const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <div className="recharts-legend">{children}</div>
}

export const ChartLegendItem = () => {
  return <div className="recharts-legend-item"></div>
}
