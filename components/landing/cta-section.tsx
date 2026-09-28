import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-accent/10 px-6 py-14 text-center sm:px-12">
        <svg
          className="pointer-events-none absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2 text-primary/20"
          viewBox="0 0 600 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="ecg-line"
            d="M0 50 H200 L220 20 L240 80 L260 10 L280 90 L300 50 H600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <div className="relative">
          <h2 className="font-display text-balance text-3xl font-bold sm:text-4xl">
            اطمئن على صحتك خلال أقل من دقيقة
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            تقييم ذكي مجاني يمنحك درجة الخطورة والقسم المناسب ووقت الانتظار المتوقع.
          </p>
          <Link
            href="/assessment"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'mt-8 h-12 gap-2 rounded-xl px-8 text-base font-semibold',
            )}
          >
            ابدأ التقييم
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
