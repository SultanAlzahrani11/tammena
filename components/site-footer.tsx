import { Logo } from '@/components/logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            منصة لدعم القرار الصحي بالذكاء الاصطناعي. المعلومات المقدّمة استرشادية ولا تغني عن
            التشخيص الطبي المتخصص. في الحالات الطارئة اتصل بـ 997.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">{'© 2026 طمّنا — مشروع هاكاثون الذكاء الاصطناعي وعلوم البيانات'}</p>
      </div>
    </footer>
  )
}
