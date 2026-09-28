'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  CONDITIONS,
  SYMPTOMS,
  computeRisk,
  encodeAssessment,
  type AssessmentInput,
} from '@/lib/risk'
import { ProgressTracker } from './progress-tracker'
import { LiveRiskPanel } from './live-risk-panel'

export const STEPS = [
  { id: 'age', title: 'العمر', question: 'كم عمرك؟', hint: 'يساعد العمر النموذج على تقدير احتمالية المضاعفات.' },
  { id: 'gender', title: 'الجنس', question: 'ما جنسك؟', hint: 'بعض الأعراض تختلف دلالتها السريرية بحسب الجنس.' },
  { id: 'symptoms', title: 'الأعراض', question: 'ما الأعراض التي تشعر بها؟', hint: 'اختر كل ما ينطبق عليك.' },
  { id: 'pain', title: 'مستوى الألم', question: 'ما شدة الألم الذي تشعر به؟', hint: 'من 0 (لا ألم) إلى 10 (ألم لا يُحتمل).' },
  { id: 'conditions', title: 'الأمراض المزمنة', question: 'هل لديك أي أمراض مزمنة؟', hint: 'اختر كل ما ينطبق، أو تخطَّ إن لم يوجد.' },
] as const

const AGE_PRESETS = [8, 25, 45, 65, 80]

const PAIN_LABELS = ['لا ألم', 'خفيف', 'خفيف', 'مزعج', 'مزعج', 'متوسط', 'متوسط', 'شديد', 'شديد', 'حاد جداً', 'لا يُحتمل']

export function AssessmentWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [input, setInput] = useState<AssessmentInput>({
    age: null,
    gender: null,
    symptoms: [],
    pain: 0,
    conditions: [],
  })

  const risk = useMemo(() => computeRisk(input), [input])

  const canContinue =
    (step === 0 && input.age !== null && input.age > 0 && input.age <= 120) ||
    (step === 1 && input.gender !== null) ||
    (step === 2 && input.symptoms.length > 0) ||
    step === 3 ||
    step === 4

  const toggle = (key: 'symptoms' | 'conditions', id: string) =>
    setInput((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((x) => x !== id) : [...prev[key], id],
    }))

  const next = () => {
    if (!canContinue) return
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    setSubmitting(true)
    router.push(`/results?${encodeAssessment(input)}`)
  }

  const current = STEPS[step]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="flex flex-col gap-6">
        <ProgressTracker steps={STEPS.map((s) => s.title)} current={step} onSelect={(i) => i < step && setStep(i)} />

        <section
          aria-labelledby="step-title"
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-6 sm:p-8"
        >
          <p className="mb-2 text-sm font-medium text-primary">
            {`الخطوة ${step + 1} من ${STEPS.length}`}
          </p>
          <h2 id="step-title" className="font-display text-2xl font-bold sm:text-3xl">
            {current.question}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{current.hint}</p>

          <div className="mt-8 min-h-64">
            {current.id === 'age' && (
              <div className="flex flex-col gap-6">
                <label className="flex max-w-xs flex-col gap-2">
                  <span className="text-sm font-medium">العمر بالسنوات</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={120}
                    autoFocus
                    value={input.age ?? ''}
                    onChange={(e) => {
                      const v = e.target.value === '' ? null : Math.min(120, Math.max(0, Number(e.target.value)))
                      setInput((p) => ({ ...p, age: v }))
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) next()
                    }}
                    placeholder="مثال: 45"
                    className="h-16 rounded-2xl border border-input bg-background px-5 font-display text-3xl font-bold tabular-nums outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-4 focus:ring-primary/20"
                  />
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="w-full text-xs text-muted-foreground">اختيار سريع</span>
                  {AGE_PRESETS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setInput((p) => ({ ...p, age: a }))}
                      className={cn(
                        'rounded-xl border px-4 py-2 text-sm tabular-nums transition-colors',
                        input.age === a
                          ? 'border-primary bg-primary/15 text-primary'
                          : 'border-border bg-background/60 hover:border-primary/50',
                      )}
                    >
                      {`${a} سنة`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {current.id === 'gender' && (
              <div role="radiogroup" aria-label="الجنس" className="grid max-w-lg grid-cols-2 gap-4">
                {(
                  [
                    { id: 'male', label: 'ذكر' },
                    { id: 'female', label: 'أنثى' },
                  ] as const
                ).map((g) => {
                  const active = input.gender === g.id
                  return (
                    <button
                      key={g.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setInput((p) => ({ ...p, gender: g.id }))}
                      className={cn(
                        'flex h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 text-lg font-semibold transition-all',
                        active
                          ? 'border-primary bg-primary/10 text-primary shadow-md shadow-primary/15'
                          : 'border-border bg-background/60 hover:border-primary/50',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-6 items-center justify-center rounded-full border-2',
                          active ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/40',
                        )}
                      >
                        {active && <Check className="size-3.5" aria-hidden="true" />}
                      </span>
                      {g.label}
                    </button>
                  )
                })}
              </div>
            )}

            {current.id === 'symptoms' && (
              <ChipGrid
                label="الأعراض"
                items={SYMPTOMS.map((s) => ({ id: s.id, label: s.label, severe: s.weight >= 20 }))}
                selected={input.symptoms}
                onToggle={(id) => toggle('symptoms', id)}
              />
            )}

            {current.id === 'pain' && (
              <div className="flex flex-col gap-8">
                <div className="flex items-end justify-between">
                  <span className="font-display text-7xl font-bold tabular-nums text-primary">{input.pain}</span>
                  <span
                    className={cn(
                      'rounded-full px-4 py-1.5 text-sm font-semibold',
                      input.pain >= 7
                        ? 'bg-destructive/15 text-destructive'
                        : input.pain >= 4
                          ? 'bg-warning/15 text-warning'
                          : 'bg-success/15 text-success',
                    )}
                  >
                    {PAIN_LABELS[input.pain]}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={input.pain}
                  onChange={(e) => setInput((p) => ({ ...p, pain: Number(e.target.value) }))}
                  aria-label="مستوى الألم"
                  aria-valuetext={`${input.pain} — ${PAIN_LABELS[input.pain]}`}
                  className="pain-range w-full"
                  style={{ ['--pain' as string]: `${input.pain * 10}%` }}
                />
                <div className="grid grid-cols-11 gap-1" aria-hidden="true">
                  {Array.from({ length: 11 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      tabIndex={-1}
                      onClick={() => setInput((p) => ({ ...p, pain: i }))}
                      className={cn(
                        'h-10 rounded-lg text-xs font-semibold tabular-nums transition-colors',
                        i <= input.pain
                          ? i >= 7
                            ? 'bg-destructive text-white'
                            : i >= 4
                              ? 'bg-warning text-background'
                              : 'bg-success text-background'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {current.id === 'conditions' && (
              <ChipGrid
                label="الأمراض المزمنة"
                items={CONDITIONS.map((c) => ({ id: c.id, label: c.label }))}
                selected={input.conditions}
                onToggle={(id) => toggle('conditions', id)}
              />
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-border/60 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0 || submitting}
              className="gap-2"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
              السابق
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={next}
              disabled={!canContinue || submitting}
              className="h-11 min-w-40 gap-2 rounded-xl font-semibold"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  جارٍ التحليل...
                </>
              ) : step === STEPS.length - 1 ? (
                <>
                  <Sparkles className="size-4" aria-hidden="true" />
                  تحليل النتائج
                </>
              ) : (
                <>
                  التالي
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </section>
      </div>

      <LiveRiskPanel risk={risk} input={input} />
    </div>
  )
}

function ChipGrid({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string
  items: { id: string; label: string; severe?: boolean }[]
  selected: string[]
  onToggle: (id: string) => void
}) {
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const active = selected.includes(item.id)
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(item.id)}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-4 py-3.5 text-start text-sm font-medium transition-all',
                active
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              <span
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center rounded-md border',
                  active ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/40',
                )}
              >
                {active && <Check className="size-3.5" aria-hidden="true" />}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.severe && (
                <span className="rounded-md bg-destructive/15 px-1.5 py-0.5 text-[10px] font-semibold text-destructive">
                  مؤشر خطر
                </span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
