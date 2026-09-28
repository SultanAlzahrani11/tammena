import Link from 'next/link'
import {
  AlertTriangle,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Clock,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Star,
  Stethoscope,
} from 'lucide-react'
import { RiskGauge } from '@/components/risk-gauge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  formatWait,
  recommendHospital,
  toneClasses,
  type AssessmentInput,
  type RiskResult,
} from '@/lib/risk'

function buildExplanation(input: AssessmentInput, risk: RiskResult) {
  const parts: string[] = []
  const top = risk.selectedSymptoms[0]
  if (top) parts.push(`رصد النموذج «${top.label}» كأقوى مؤشر سريري في حالتك`)
  if (input.pain >= 7) parts.push(`مع مستوى ألم مرتفع (${input.pain}/10)`)
  else if (input.pain > 0) parts.push(`مع مستوى ألم ${input.pain}/10`)
  if (risk.selectedConditions.length)
    parts.push(`وتاريخ مرضي يشمل ${risk.selectedConditions.map((c) => c.label).join(' و')}`)
  if (input.age !== null && input.age >= 60) parts.push(`إضافة إلى عامل العمر (${input.age} سنة)`)
  const base = parts.length ? `${parts.join('، ')}.` : ''
  const tail =
    risk.priority.id === 'critical'
      ? ' هذا النمط يتطابق مع حالات تتطلب تدخلاً عاجلاً في بيانات التدريب، لذا تم توجيهك إلى الطوارئ مباشرة.'
      : ` بناءً على أنماط مشابهة في أكثر من 1.2 مليون زيارة، يُعد قسم ${risk.department.name} الأنسب لحالتك.`
  return base + tail
}

const ACTION_STEPS: Record<RiskResult['priority']['id'], string[]> = {
  critical: ['اتصل بالإسعاف 997 أو توجّه للطوارئ فوراً', 'لا تقد السيارة بنفسك', 'اصطحب قائمة أدويتك الحالية'],
  high: ['توجّه إلى المستشفى الموصى به خلال ساعة', 'راقب الأعراض وأي تدهور مفاجئ', 'أحضر نتائج تحاليلك السابقة'],
  medium: ['احجز موعداً اليوم في القسم الموصى به', 'تناول السوائل واسترح', 'عُد للتقييم إذا ساءت الأعراض'],
  low: ['رعاية منزلية مع الراحة والسوائل', 'استخدم مسكنات بسيطة عند الحاجة', 'راجع الطبيب إن استمرت الأعراض 48 ساعة'],
}

export function ResultsView({ input, risk }: { input: AssessmentInput; risk: RiskResult }) {
  const tone = toneClasses(risk.priority.tone)
  const hospitals = recommendHospital(risk.department.id, risk.waitMinutes)
  const best = hospitals[0]
  const totalImpact = risk.factors.reduce((s, f) => s + f.impact, 0) || 1
  const caseId = `TM-${(risk.score * 7919 + (input.age ?? 0) * 31 + input.pain).toString(36).toUpperCase().padStart(6, '0')}`

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-primary">نتيجة التقييم</p>
          <h1 className="font-display text-balance text-3xl font-bold sm:text-4xl">تقريرك الصحي الذكي</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {`رقم الحالة ${caseId} · ${input.gender === 'female' ? 'أنثى' : input.gender === 'male' ? 'ذكر' : '—'} · ${input.age ?? '—'} سنة`}
          </p>
        </div>
        <Link href="/assessment" className={cn(buttonVariants({ variant: 'outline' }), 'gap-2 rounded-xl')}>
          <RotateCcw className="size-4" aria-hidden="true" />
          تقييم جديد
        </Link>
      </header>

      {risk.priority.id === 'critical' && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
          <p>
            <strong className="text-destructive">تنبيه عاجل: </strong>
            تشير المعطيات إلى حالة قد تستدعي تدخلاً طبياً فورياً. اتصل بالإسعاف على 997 الآن.
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <section
          aria-label="درجة الخطورة"
          className={cn('flex flex-col items-center gap-4 rounded-3xl border bg-card/60 p-6', tone.border)}
        >
          <RiskGauge score={risk.score} size={240} label="درجة الخطورة" />
          <div className="grid w-full grid-cols-2 gap-3">
            <Stat label="مستوى الأولوية" value={risk.priority.label} valueClass={tone.text} />
            <Stat label="ثقة النموذج" value={`${risk.confidence}%`} />
          </div>
        </section>

        <section aria-label="التوصيات" className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          <InfoCard icon={Stethoscope} label="القسم الموصى به" value={risk.department.name} note="بناءً على العَرَض الأعلى تأثيراً" />
          <InfoCard icon={Clock} label="وقت الانتظار المتوقع" value={formatWait(best.wait)} note={`في ${best.name}`} />
          <div className={cn('rounded-3xl border p-5 sm:col-span-2', tone.border, tone.soft)}>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className={cn('size-5', tone.text)} aria-hidden="true" />
              <h2 className="text-sm text-muted-foreground">الإجراء الموصى به</h2>
            </div>
            <p className={cn('font-display text-2xl font-bold', tone.text)}>{risk.priority.action}</p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-3">
              {ACTION_STEPS[risk.priority.id].map((s, i) => (
                <li key={s} className="flex items-start gap-2 rounded-xl bg-background/60 p-3 text-sm">
                  <span className={cn('flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-background', tone.bg)}>
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section aria-labelledby="xai-title" className="rounded-3xl border border-border/60 bg-card/60 p-6 lg:col-span-3">
          <div className="mb-4 flex items-center gap-2">
            <BrainCircuit className="size-5 text-primary" aria-hidden="true" />
            <h2 id="xai-title" className="font-semibold">تفسير الذكاء الاصطناعي</h2>
          </div>
          <p className="rounded-2xl bg-background/60 p-4 leading-loose text-pretty">{buildExplanation(input, risk)}</p>

          <h3 className="mb-1 mt-6 text-sm font-semibold">العوامل القابلة للتفسير (SHAP)</h3>
          <p className="mb-4 text-xs text-muted-foreground">مساهمة كل عامل في درجة الخطورة النهائية</p>
          <ul className="flex flex-col gap-4">
            {risk.factors.map((f) => {
              const pct = Math.round((f.impact / totalImpact) * 100)
              return (
                <li key={f.label}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">{f.label}</span>
                    <span className="tabular-nums text-muted-foreground">
                      <span className={cn('font-semibold', tone.text)}>{`+${f.impact}`}</span>
                      {` نقطة · ${pct}%`}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-to-l from-primary to-accent" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{f.detail}</p>
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-labelledby="hosp-title" className="rounded-3xl border border-border/60 bg-card/60 p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="size-5 text-primary" aria-hidden="true" />
            <h2 id="hosp-title" className="font-semibold">المستشفى الموصى به</h2>
          </div>
          <ul className="flex flex-col gap-3">
            {hospitals.map((h, i) => (
              <li
                key={h.name}
                className={cn(
                  'rounded-2xl border p-4',
                  i === 0 ? 'border-primary/50 bg-primary/10' : 'border-border/60 bg-background/60',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{h.name}</p>
                    <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {`${h.distanceKm} كم`}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="size-3.5 fill-warning text-warning" aria-hidden="true" />
                        {h.rating}
                      </span>
                    </p>
                  </div>
                  {i === 0 && (
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground">
                      الأفضل
                    </span>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-background/60 p-2">
                    <span className="text-muted-foreground">الانتظار: </span>
                    <span className="font-semibold">{formatWait(h.wait)}</span>
                  </div>
                  <div className="rounded-lg bg-background/60 p-2">
                    <span className="text-muted-foreground">الإشغال: </span>
                    <span className={cn('font-semibold tabular-nums', h.load >= 0.8 ? 'text-destructive' : h.load >= 0.6 ? 'text-warning' : 'text-success')}>
                      {`${Math.round(h.load * 100)}%`}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
            <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
            الترتيب مبني على المسافة والإشغال اللحظي وتقييم الجودة. هذه النتيجة مساندة للقرار ولا تُغني عن الطبيب.
          </p>
        </section>
      </div>
    </div>
  )
}

function Stat({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="rounded-xl bg-background/60 p-3 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn('mt-1 font-display text-lg font-bold tabular-nums', valueClass)}>{value}</p>
    </div>
  )
}

function InfoCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/60 p-5">
      <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  )
}
