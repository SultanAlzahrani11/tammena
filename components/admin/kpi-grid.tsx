import { BedDouble, Clock, TrendingDown, TrendingUp, Users, Activity } from 'lucide-react'
import { KPIS, DEPARTMENT_LOAD } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

const congested = DEPARTMENT_LOAD.filter((d) => d.load >= 75).length

const ITEMS = [
  {
    icon: Users,
    label: 'مرضى اليوم',
    value: String(KPIS.patientsToday),
    delta: `+${KPIS.patientsDelta}%`,
    good: false,
    note: 'مقارنة بالأمس',
  },
  {
    icon: Clock,
    label: 'متوسط وقت الانتظار',
    value: `${KPIS.avgWait} دقيقة`,
    delta: `${KPIS.avgWaitDelta}%`,
    good: true,
    note: 'منذ تفعيل طمّنا',
  },
  {
    icon: BedDouble,
    label: 'إشغال الأسرّة',
    value: `${KPIS.bedOccupancy}%`,
    delta: `${KPIS.bedsUsed}/${KPIS.bedsTotal}`,
    good: null,
    note: 'سرير مشغول',
    progress: KPIS.bedOccupancy,
  },
  {
    icon: Activity,
    label: 'أقسام مزدحمة',
    value: `${congested} من ${DEPARTMENT_LOAD.length}`,
    delta: 'فوق 75%',
    good: null,
    note: 'نسبة إشغال',
  },
]

export function KpiGrid() {
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ITEMS.map((k) => (
        <div key={k.label} className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-5">
          <div className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-primary/10 blur-2xl" />
          <div className="flex items-center justify-between">
            <dt className="text-sm text-muted-foreground">{k.label}</dt>
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <k.icon className="size-4.5" aria-hidden="true" />
            </span>
          </div>
          <dd className="mt-3 font-display text-3xl font-bold tabular-nums">{k.value}</dd>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold tabular-nums',
                k.good === true && 'bg-success/15 text-success',
                k.good === false && 'bg-warning/15 text-warning',
                k.good === null && 'bg-muted text-foreground',
              )}
            >
              {k.good === true && <TrendingDown className="size-3" aria-hidden="true" />}
              {k.good === false && <TrendingUp className="size-3" aria-hidden="true" />}
              {k.delta}
            </span>
            <span className="text-muted-foreground">{k.note}</span>
          </div>
          {k.progress !== undefined && (
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-to-l from-warning to-primary" style={{ width: `${k.progress}%` }} />
            </div>
          )}
        </div>
      ))}
    </dl>
  )
}
