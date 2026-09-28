import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ProgressTracker({
  steps,
  current,
  onSelect,
}: {
  steps: string[]
  current: number
  onSelect: (i: number) => void
}) {
  const pct = Math.round((current / (steps.length - 1)) * 100)

  return (
    <nav aria-label="تقدّم التقييم" className="rounded-3xl border border-border/60 bg-card/60 p-5">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-medium">تقدّم التقييم</span>
        <span className="tabular-nums text-primary">{`${pct}%`}</span>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-l from-accent to-primary transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ol className="flex items-start justify-between gap-2">
        {steps.map((label, i) => {
          const done = i < current
          const active = i === current
          return (
            <li key={label} className="flex flex-1 flex-col items-center gap-2 text-center">
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={!done}
                aria-current={active ? 'step' : undefined}
                aria-label={`${label}${done ? ' (مكتمل)' : ''}`}
                className={cn(
                  'flex size-9 items-center justify-center rounded-full border-2 text-sm font-bold tabular-nums transition-colors',
                  done && 'border-primary bg-primary text-primary-foreground hover:bg-primary/80',
                  active && 'border-primary bg-primary/15 text-primary ring-4 ring-primary/15',
                  !done && !active && 'border-border text-muted-foreground',
                )}
              >
                {done ? <Check className="size-4" aria-hidden="true" /> : i + 1}
              </button>
              <span
                className={cn(
                  'hidden text-xs sm:block',
                  active ? 'font-semibold text-foreground' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
