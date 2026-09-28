'use client'

import { Area, ComposedChart, CartesianGrid, Line, ReferenceLine, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { WAIT_HISTORY, WAIT_PREDICTION } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

const config = {
  actual: { label: 'الانتظار الفعلي', color: 'var(--chart-2)' },
  predicted: { label: 'التنبؤ', color: 'var(--chart-1)' },
  range: { label: 'نطاق الثقة 90%', color: 'var(--chart-1)' },
} satisfies ChartConfig

const data = [
  ...WAIT_HISTORY.map((d) => ({ ...d, range: null as [number, number] | null })),
  ...WAIT_PREDICTION.map((d) => ({
    time: d.time,
    actual: d.actual,
    predicted: d.predicted,
    range: [d.lower, d.upper] as [number, number],
  })),
]

export function WaitPredictionChart({ className }: { className?: string }) {
  return (
    <ChartContainer config={config} className={cn('aspect-auto h-72 w-full', className)}>
      <ComposedChart data={data} margin={{ left: 0, right: 0, top: 10 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} reversed />
        <YAxis orientation="right" tickLine={false} axisLine={false} width={32} unit="د" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ReferenceLine
          x="الآن"
          stroke="var(--muted-foreground)"
          strokeDasharray="4 4"
          label={{ value: 'الآن', position: 'top', fill: 'var(--muted-foreground)', fontSize: 11 }}
        />
        <Area
          dataKey="range"
          type="monotone"
          stroke="none"
          fill="var(--color-range)"
          fillOpacity={0.15}
        />
        <Line
          dataKey="actual"
          type="monotone"
          stroke="var(--color-actual)"
          strokeWidth={2.5}
          dot={{ r: 3 }}
          connectNulls={false}
        />
        <Line
          dataKey="predicted"
          type="monotone"
          stroke="var(--color-predicted)"
          strokeWidth={2}
          strokeDasharray="6 4"
          dot={false}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>
  )
}
