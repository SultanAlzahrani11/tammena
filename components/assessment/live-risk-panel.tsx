import { BrainCircuit, Building2, Clock, Gauge } from 'lucide-react'
import { RiskGauge } from '@/components/risk-gauge'
import { cn } from '@/lib/utils'
import { formatWait, toneClasses, type AssessmentInput, type RiskResult } from '@/lib/risk'

export function LiveRiskPanel({ risk, input }: { risk: RiskResult; input: AssessmentInput }) {
  const tone = toneClasses(risk.priority.tone)
  const hasData = input.age !== null || input.symptoms.length > 0 || input.pain > 0

  return (
    <aside
      aria-label="مؤشر الخطورة المباشر"
      className="flex h-fit flex-col gap-5 rounded-3xl border border-border/60 bg-card/60 p-6 lg:sticky lg:top-24"
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold">
          <BrainCircuit className="size-5 text-primary" aria-hidden="true" />
          التحليل المباشر
        </h2>
        <span className="flex items-center gap-1.5 text-xs text-success">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          يتحدّث لحظياً
        </span>
      </div>

      <div className="flex justify-center" aria-live="polite">
        <RiskGauge score={risk.score} size={210} />
      </div>

      <dl className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-background/60 p-3">
          <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="size-3.5" aria-hidden="true" />
            القسم المتوقع
          </dt>
          <dd className="mt-1 text-sm font-semibold">{hasData ? risk.department.name : '—'}</dd>
        </div>
        <div className="rounded-xl bg-background/60 p-3">
          <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" aria-hidden="true" />
            الانتظار
          </dt>
          <dd className="mt-1 text-sm font-semibold">{hasData ? formatWait(risk.waitMinutes) : '—'}</dd>
        </div>
        <div className="col-span-2 rounded-xl bg-background/60 p-3">
          <dt className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Gauge className="size-3.5" aria-hidden="true" />
              ثقة النموذج
            </span>
            <span className="tabular-nums text-foreground">{`${risk.confidence}%`}</span>
          </dt>
          <dd className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500"
              style={{ width: `${risk.confidence}%` }}
            />
          </dd>
        </div>
      </dl>

      <div>
        <h3 className="mb-3 text-sm font-medium">العوامل المؤثرة</h3>
        {risk.factors.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
            ستظهر العوامل هنا مع إدخال بياناتك
          </p>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {risk.factors.map((f) => (
              <li key={f.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span>{f.label}</span>
                  <span className={cn('font-semibold tabular-nums', tone.text)}>{`+${f.impact}`}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn('h-full rounded-full transition-[width] duration-500', tone.bg)}
                    style={{ width: `${Math.min(100, (f.impact / 45) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        هذا التقييم أداة مساندة للقرار ولا يُغني عن الاستشارة الطبية. في الحالات الطارئة اتصل بـ 997.
      </p>
    </aside>
  )
}
