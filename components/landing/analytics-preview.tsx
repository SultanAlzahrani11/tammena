import { BedDouble, Clock, TrendingUp, Users } from 'lucide-react'
import { PatientFlowChart } from '@/components/charts/patient-flow-chart'
import { WaitPredictionChart } from '@/components/charts/wait-prediction-chart'
import { DEPARTMENT_LOAD, KPIS } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

const MINI = [
  { icon: Users, label: 'مرضى اليوم', value: String(KPIS.patientsToday) },
  { icon: Clock, label: 'متوسط الانتظار', value: `${KPIS.avgWait} د` },
  { icon: BedDouble, label: 'إشغال الأسرّة', value: `${KPIS.bedOccupancy}%` },
  { icon: TrendingUp, label: 'دقة التنبؤ', value: `${KPIS.modelAccuracy}%` },
]

export function AnalyticsPreview() {
  return (
    <section id="analytics" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold text-primary">تحليلات تنبؤية</p>
        <h2 className="font-display text-balance text-3xl font-bold sm:text-4xl">
          رؤية المستشفى قبل أن تحدث الذروة
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          نماذج السلاسل الزمنية تتنبأ بتدفق المرضى وأوقات الانتظار لست ساعات قادمة بنطاق ثقة 90%.
        </p>
      </div>

      <div className="relative rounded-3xl border border-border/60 bg-card/70 p-3 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            <span className="text-sm font-medium">بث مباشر — مجمع الشفاء الطبي</span>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:block">آخر تحديث قبل 12 ثانية</span>
        </div>

        <dl className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {MINI.map((m) => (
            <div key={m.label} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/60 p-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <m.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-xs text-muted-foreground">{m.label}</dt>
                <dd className="font-display text-xl font-bold tabular-nums">{m.value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-background/60 p-4 lg:col-span-2">
            <h3 className="mb-1 font-semibold">تدفق المرضى اليومي</h3>
            <p className="mb-3 text-xs text-muted-foreground">الوافدون مقابل التنبؤ بالساعة</p>
            <PatientFlowChart className="h-64" />
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
            <h3 className="mb-1 font-semibold">ازدحام الأقسام</h3>
            <p className="mb-4 text-xs text-muted-foreground">نسبة الإشغال الحالية</p>
            <ul className="flex flex-col gap-3">
              {DEPARTMENT_LOAD.slice(0, 5).map((d) => (
                <li key={d.dept}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span>{d.dept}</span>
                    <span className="tabular-nums text-muted-foreground">{d.load}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        d.load >= 85 ? 'bg-destructive' : d.load >= 70 ? 'bg-warning' : 'bg-primary',
                      )}
                      style={{ width: `${d.load}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/60 p-4 lg:col-span-3">
            <h3 className="mb-1 font-semibold">التنبؤ بوقت الانتظار — الطوارئ</h3>
            <p className="mb-3 text-xs text-muted-foreground">
              الفعلي خلال الساعات الست الماضية، والمتوقع للساعات الست القادمة مع نطاق الثقة
            </p>
            <WaitPredictionChart className="h-64" />
          </div>
        </div>
      </div>
    </section>
  )
}
