import Link from 'next/link'
import { Activity } from 'lucide-react'
import { Logo } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'الرئيسية' },
  { href: '/assessment', label: 'التقييم الذكي' },
  { href: '/results', label: 'النتائج' },
  { href: '/admin', label: 'لوحة الإدارة' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="التنقل الرئيسي" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'md:hidden')}
          >
            الإدارة
          </Link>
          <Link
            href="/assessment"
            className={cn(buttonVariants({ size: 'lg' }), 'h-10 px-4 font-semibold')}
          >
            <Activity data-icon="inline-start" />
            ابدأ التقييم
          </Link>
        </div>
      </div>
    </header>
  )
}
