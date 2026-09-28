import { Activity, Building2, Clock, GitBranch, Lightbulb, Route } from 'lucide-react'

const FEATURES = [
  {
    icon: Activity,
    title: 'تقييم المخاطر الصحية',
    desc: 'نموذج تعلّم آلي يحلل الأعراض والعمر والأمراض المزمنة لحساب درجة خطورة من 0 إلى 100.',
  },
  {
    icon: Clock,
    title: 'التنبؤ بوقت الانتظار',
    desc: 'تنبؤات لحظية مبنية على سلاسل زمنية لتدفق المرضى والطاقة الاستيعابية لكل قسم.',
  },
  {
    icon: GitBranch,
    title: 'التوجيه للقسم المناسب',
    desc: 'تصنيف ذكي يربط نمط الأعراض بالتخصص الطبي الأنسب لتقليل التحويلات الخاطئة.',
  },
  {
    icon: Building2,
    title: 'ترشيح المستشفى الأمثل',
    desc: 'موازنة بين المسافة ومستوى الازدحام وتقييم الجودة لاقتراح أفضل وجهة علاجية.',
  },
  {
    icon: Lightbulb,
    title: 'ذكاء اصطناعي قابل للتفسير',
    desc: 'نوضح لك العوامل التي أثّرت في القرار ووزن كل عامل بشفافية كاملة.',
  },
  {
    icon: Route,
    title: 'توجيه رحلة المريض',
    desc: 'خطوات واضحة من لحظة التقييم حتى الوصول إلى الطبيب، مع تحديثات مستمرة.',
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold text-primary">القدرات الأساسية</p>
        <h2 className="font-display text-balance text-3xl font-bold sm:text-4xl">
          منصة واحدة، قرارات صحية أذكى
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          نجمع بين علوم البيانات والذكاء الاصطناعي لنمنح المريض والمستشفى رؤية واضحة وفورية.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <li
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 transition-colors hover:border-primary/50"
          >
            <div className="pointer-events-none absolute -left-16 -top-16 size-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
            <span className="mb-5 flex size-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              <f.icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
