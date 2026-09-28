import { DEPARTMENT_LOAD } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

function loadTone(load: number) {
  if (load >= 85) return { bar: 'bg-destructive', text: 'text-destructive', label: 'حرج' }
  if (load >= 70) return { bar: 'bg-warning', text: 'text-warning', label: 'مرتفع' }
  if (load >= 50) return { bar: 'bg-primary', text: 'text-primary', label: 'متوسط' }
  return { bar: 'bg-success', text: 'text-success', label: 'منخفض' }
}

export function DepartmentLoadChart({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-col justify-between gap-3', className)}>
      {DEPARTMENT_LOAD.map((d) => {
        const tone = loadTone(d.load)
        return (
          <li key={d.dept}>
            <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
              <span className="font-medium text-foreground">{d.dept}</span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="tabular-nums">{`${d.patients}/${d.capacity}`}</span>
                <span className={cn('font-bold tabular-nums', tone.text)}>{`${d.load}%`}</span>
              </span>
            </div>
            <div
              className="h-2.5 overflow-hidden rounded-full bg-muted"
              role="meter"
              aria-label={`إشغال ${d.dept}`}
              aria-valuenow={d.load}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${d.load}% — ${tone.label}`}
            >
              <div className={cn('h-full rounded-full', tone.bar)} style={{ width: `${d.load}%` }} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
