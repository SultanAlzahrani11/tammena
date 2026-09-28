import { Sparkles } from 'lucide-react'
import { RECOMMENDATIONS } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

export function Recommendations() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {RECOMMENDATIONS.map((r) => (
        <li key={r.title} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span
                className={cn(
                  'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg',
                  r.priority === 'high' ? 'bg-warning/15 text-warning' : 'bg-primary/15 text-primary',
                )}
              >
                <Sparkles className="size-3.5" aria-hidden="true" />
              </span>
              <h3 className="text-sm font-semibold leading-relaxed">{r.title}</h3>
            </div>
            <span className="shrink-0 rounded-md bg-success/15 px-2 py-0.5 text-xs font-bold tabular-nums text-success">
              {r.impact}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">{r.detail}</p>
          <div className="mt-auto flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>الثقة</span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${r.confidence}%` }} />
            </div>
            <span className="tabular-nums">{`${r.confidence}%`}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
