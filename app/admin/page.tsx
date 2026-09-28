import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { KpiGrid } from '@/components/admin/kpi-grid'
import { Panel } from '@/components/admin/panel'
import { Recommendations } from '@/components/admin/recommendations'
import { LiveQueue } from '@/components/admin/live-queue'
import { PatientFlowChart } from '@/components/charts/patient-flow-chart'
import { WaitPredictionChart } from '@/components/charts/wait-prediction-chart'
import { DepartmentLoadChart } from '@/components/charts/department-load-chart'
import { PriorityMixChart } from '@/components/charts/priority-mix-chart'
import { WeeklyTrendChart } from '@/components/charts/weekly-trend-chart'

export const metadata: Metadata = {
  title: 'لوحة الإدارة | طمّنا',
  description: 'مراقبة تدفق المرضى، ازدحام الأقسام، والتنبؤ بأوقات الانتظار لحظياً.',
}

export default function AdminPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-primary">مركز القيادة التشغيلي</p>
            <h1 className="font-display text-3xl font-bold">لوحة تحكم المستشفى</h1>
            <p className="mt-1 text-sm text-muted-foreground">مجمع الشفاء الطبي · الأحد 27 سبتمبر 2026</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            النماذج تعمل · آخر تحديث 14:32
          </div>
        </header>

        <KpiGrid />

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Panel title="تدفق المرضى" description="الوافدون والمُخرَّجون مقابل تنبؤ النموذج" className="lg:col-span-2">
            <PatientFlowChart className="h-72" />
          </Panel>
          <Panel title="توزيع الأولويات" description="حالات اليوم حسب مستوى الخطورة">
            <PriorityMixChart />
          </Panel>

          <Panel title="التنبؤ بوقت الانتظار" description="الطوارئ — 6 ساعات قادمة بنطاق ثقة 90%" className="lg:col-span-2">
            <WaitPredictionChart className="h-72" />
          </Panel>
          <Panel title="ازدحام الأقسام" description="نسبة الإشغال الحالية">
            <DepartmentLoadChart className="h-72" />
          </Panel>

          <Panel title="توصيات تحسين الموارد" description="مولّدة بالذكاء الاصطناعي بناءً على التنبؤات" className="lg:col-span-2">
            <Recommendations />
          </Panel>
          <Panel title="قائمة الانتظار الذكية" description="مرتّبة حسب درجة الخطورة">
            <LiveQueue />
          </Panel>

          <Panel title="الاتجاه الأسبوعي" description="عدد المرضى ومتوسط الانتظار" className="lg:col-span-3">
            <WeeklyTrendChart />
          </Panel>
        </div>
      </main>
    </>
  )
}
