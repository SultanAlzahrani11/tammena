import { ClipboardList, Cpu, FileCheck2, Navigation } from 'lucide-react'

const STEPS = [
  {
    icon: ClipboardList,
    title: 'أدخل بياناتك',
    desc: 'العمر والجنس والأعراض ومستوى الألم والأمراض المزمنة في أقل من دقيقة.',
  },
  {
    icon: Cpu,
    title: 'التحليل الذكي',
    desc: 'يعالج النموذج أكثر من 40 متغيراً ويقارنها بآلاف الحالات المشابهة.',
  },
  {
    icon: FileCheck2,
    title: 'نتيجة قابلة للتفسير',
    desc: 'درجة خطورة، أولوية، قسم مقترح، ودرجة ثقة مع شرح العوامل المؤثرة.',
  },
  {
    icon: Navigation,
    title: 'توجيه فوري',
    desc: 'المستشفى الأنسب ووقت الانتظار المتوقع والإجراء الموصى به.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative border-y border-border/60 bg-card/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold text-accent">أربع خطوات</p>
          <h2 className="font-display text-balance text-3xl font-bold sm:text-4xl">كيف يعمل طمّنا؟</h2>
        </div>

        <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-[12%] top-7 hidden h-px bg-gradient-to-l from-primary/0 via-primary/60 to-primary/0 md:block"
          aria-hidden="true"
        />
        <ol className="relative grid gap-8 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 mb-5 flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-card text-primary shadow-lg shadow-primary/10">
                <step.icon className="size-6" aria-hidden="true" />
                <span className="absolute -left-2 -top-2 flex size-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {i + 1}
                </span>
              </span>
              <h3 className="mb-2 font-display text-lg font-semibold">{step.title}</h3>
              <p className="max-w-60 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}
