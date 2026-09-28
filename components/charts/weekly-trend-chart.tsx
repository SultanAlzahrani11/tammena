'use client'

import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { WEEKLY_TREND } from '@/lib/demo-data'

const config = {
  patients: { label: 'عدد المرضى', color: 'var(--chart-3)' },
  avgWait: { label: 'متوسط الانتظار (د)', color: 'var(--chart-2)' },
} satisfies ChartConfig

export function WeeklyTrendChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-72 w-full">
      <ComposedChart data={WEEKLY_TREND} margin={{ left: 0, right: 0, top: 10 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} reversed />
        <YAxis yAxisId="p" orientation="right" tickLine={false} axisLine={false} width={36} />
        <YAxis yAxisId="w" orientation="left" tickLine={false} axisLine={false} width={28} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar yAxisId="p" dataKey="patients" fill="var(--color-patients)" radius={[6, 6, 0, 0]} barSize={26} />
        <Line
          yAxisId="w"
          dataKey="avgWait"
          type="monotone"
          stroke="var(--color-avgWait)"
          strokeWidth={2.5}
          dot={{ r: 4, fill: 'var(--color-avgWait)' }}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>
  )
}
