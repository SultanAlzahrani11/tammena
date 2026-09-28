import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, BrainCircuit, Clock, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STATS = [
  { value: '94.2%', label: 'دقة النموذج التنبؤي' },
  { value: '-37%', label: 'تقليل وقت الانتظار' },
  { value: '60 ثانية', label: 'زمن التقييم' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24">
        <div className="flex flex-col items-start gap-6">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5 text-gold" aria-hidden="true" />
            مدعوم بالذكاء الاصطناعي والتحليلات التنبؤية
          </span>

          <h1 className="font-display text-balance">
            <span className="text-gradient block text-7xl font-bold leading-tight sm:text-8xl lg:text-9xl">
              طمّنا
            </span>
            <span className="mt-3 block text-3xl font-semibold leading-snug text-foreground sm:text-4xl">
              رحلتك الصحية تبدأ بقرار أذكى
            </span>
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            نقيّم مستوى الخطورة الصحية خلال ثوانٍ، ونتنبأ بوقت الانتظار، ونوجّهك إلى القسم
            والمستشفى الأنسب لحالتك — بقرارات قابلة للتفسير وشفافة.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/assessment"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-12 gap-2 rounded-xl px-6 text-base font-semibold shadow-lg shadow-primary/25',
              )}
            >
              ابدأ التقييم
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="/admin"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-12 rounded-xl px-6 text-base',
              )}
            >
              استعرض لوحة المستشفى
            </Link>
          </div>

          <dl className="mt-4 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-border/60 pt-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-foreground tabular-nums" dir="ltr">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white shadow-2xl shadow-primary/15 ring-1 ring-border/60">
            <Image
              src="/images/hero-ai.png"
              alt="تمثيل ثلاثي الأبعاد لقلب بشري مكوّن من بيانات رقمية متوهجة"
              fill
              priority
              sizes="(min-width: 1024px) 512px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>

          <div className="glass absolute -right-2 top-8 flex items-center gap-3 rounded-2xl p-3 shadow-2xl sm:-right-8">
            <span className="flex size-10 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
              <Stethoscope className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">درجة الخطورة</p>
              <p className="font-display text-lg font-bold">
                <span className="tabular-nums">82</span>
                <span className="mr-1 text-xs font-medium text-destructive">حرجة</span>
              </p>
            </div>
          </div>

          <div className="glass absolute -left-2 top-1/2 flex items-center gap-3 rounded-2xl p-3 shadow-2xl sm:-left-8">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Clock className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">الانتظار المتوقع</p>
              <p className="font-display text-lg font-bold">
                <span className="tabular-nums">12</span> دقيقة
              </p>
            </div>
          </div>

          <div className="glass absolute bottom-6 left-1/2 flex w-[88%] -translate-x-1/2 items-center gap-3 rounded-2xl p-3 shadow-2xl">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <BrainCircuit className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">توصية الذكاء الاصطناعي</p>
              <p className="truncate text-sm font-semibold">توجيه إلى قسم أمراض القلب — مجمع الشفاء</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-success">
              <ShieldCheck className="size-4" aria-hidden="true" />
              <span className="tabular-nums">96%</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
