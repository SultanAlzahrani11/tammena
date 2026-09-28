'use client'

import { Label, Pie, PieChart } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { PRIORITY_MIX } from '@/lib/demo-data'

const LEVEL_COLORS = {
  critical: { label: 'حرجة', color: 'var(--destructive)' },
  high: { label: 'عالية', color: 'var(--warning)' },
  medium: { label: 'متوسطة', color: 'var(--chart-1)' },
  low: { label: 'منخفضة', color: 'var(--success)' },
}

const config = {
  value: { label: 'المرضى' },
  ...LEVEL_COLORS,
} satisfies ChartConfig

const total = PRIORITY_MIX.reduce((s, d) => s + d.value, 0)

export function PriorityMixChart() {
  return (
    <div className="flex flex-col gap-4">
      <ChartContainer config={config} className="mx-auto aspect-square h-52">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="level" hideLabel />} />
          <Pie
            data={PRIORITY_MIX}
            dataKey="value"
            nameKey="level"
            innerRadius={62}
            outerRadius={88}
            strokeWidth={3}
            stroke="var(--card)"
            paddingAngle={2}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                        {total}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 22} className="fill-muted-foreground text-xs">
                        حالة مُقيّمة
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <ul className="grid grid-cols-2 gap-2 text-sm">
        {PRIORITY_MIX.map((d) => (
          <li key={d.level} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
            <span className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ background: config[d.level as keyof typeof LEVEL_COLORS].color }}
                aria-hidden="true"
              />
              {d.label}
            </span>
            <span className="font-semibold tabular-nums">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
