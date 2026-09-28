import { LIVE_QUEUE } from '@/lib/demo-data'
import { getPriority, toneClasses } from '@/lib/risk'
import { cn } from '@/lib/utils'

export function LiveQueue() {
  return (
    <ul className="flex flex-col gap-2">
      {LIVE_QUEUE.map((p) => {
        const priority = getPriority(p.score)
        const tone = toneClasses(priority.tone)
        return (
          <li key={p.id} className="flex items-center gap-3 rounded-xl bg-background/60 p-3">
            <span
              className={cn(
                'flex size-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold tabular-nums',
                tone.soft,
                tone.text,
              )}
            >
              {p.score}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">
                <span dir="ltr">{p.id}</span>
                <span className="font-normal text-muted-foreground">{` · ${p.age} سنة`}</span>
              </p>
              <p className="truncate text-xs text-muted-foreground">{p.dept}</p>
            </div>
            <div className="text-end">
              <p className={cn('text-xs font-semibold', tone.text)}>{priority.label}</p>
              <p className="text-xs tabular-nums text-muted-foreground">{p.wait}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
