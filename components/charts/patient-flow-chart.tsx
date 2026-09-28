'use client'

import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { PATIENT_FLOW } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

const config = {
  arrivals: { label: 'الوافدون', color: 'var(--chart-1)' },
  discharged: { label: 'الخارجون', color: 'var(--chart-2)' },
  predicted: { label: 'تنبؤ النموذج', color: 'var(--chart-4)' },
} satisfies ChartConfig

export function PatientFlowChart({ className }: { className?: string }) {
  return (
    <ChartContainer config={config} className={cn('aspect-auto h-72 w-full', className)}>
      <AreaChart data={PATIENT_FLOW} margin={{ left: 0, right: 0, top: 10 }}>
        <defs>
          <linearGradient id="fillArrivals" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-arrivals)" stopOpacity={0.45} />
            <stop offset="95%" stopColor="var(--color-arrivals)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillDischarged" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-discharged)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-discharged)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
        <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} reversed />
        <YAxis orientation="right" tickLine={false} axisLine={false} width={32} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="arrivals"
          type="monotone"
          stroke="var(--color-arrivals)"
          strokeWidth={2}
          fill="url(#fillArrivals)"
        />
        <Area
          dataKey="discharged"
          type="monotone"
          stroke="var(--color-discharged)"
          strokeWidth={2}
          fill="url(#fillDischarged)"
        />
        <Line
          dataKey="predicted"
          type="monotone"
          stroke="var(--color-predicted)"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}
