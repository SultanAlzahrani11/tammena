import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { AssessmentWizard } from '@/components/assessment/assessment-wizard'

export const metadata: Metadata = {
  title: 'التقييم الصحي الذكي | طمّنا',
  description: 'أجب عن خمسة أسئلة واحصل على تقييم فوري لمستوى الخطورة والقسم المناسب.',
}

export default function AssessmentPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-primary/10 to-transparent" />
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold text-primary">التقييم الذكي</p>
          <h1 className="font-display text-balance text-3xl font-bold sm:text-4xl">
            لنطمئن على حالتك الصحية
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            خمس خطوات بسيطة، ويقوم نموذج الذكاء الاصطناعي بتحديث مؤشر الخطورة مع كل إجابة.
          </p>
        </header>
        <AssessmentWizard />
      </main>
    </>
  )
}
