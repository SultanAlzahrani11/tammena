import type { Metadata } from 'next'
import Link from 'next/link'
import { ClipboardList } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ResultsView } from '@/components/results/results-view'
import { buttonVariants } from '@/components/ui/button'
import { computeRisk, decodeAssessment } from '@/lib/risk'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'نتيجة التقييم | طمّنا',
  description: 'درجة الخطورة، القسم الموصى به، ووقت الانتظار المتوقع مع تفسير قرار الذكاء الاصطناعي.',
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const input = decodeAssessment(await searchParams)
  const empty = input.age === null && input.symptoms.length === 0

  return (
    <>
      <SiteHeader />
      <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-primary/10 to-transparent" />
        {empty ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ClipboardList className="size-7" aria-hidden="true" />
            </span>
            <h1 className="font-display text-2xl font-bold">لا توجد نتيجة بعد</h1>
            <p className="text-muted-foreground">أكمل التقييم الذكي أولاً لعرض النتائج والتوصيات.</p>
            <Link href="/assessment" className={cn(buttonVariants({ size: 'lg' }), 'rounded-xl')}>
              ابدأ التقييم
            </Link>
          </div>
        ) : (
          <ResultsView input={input} risk={computeRisk(input)} />
        )}
      </main>
      <SiteFooter />
    </>
  )
}
