import { cn } from '@/lib/utils'

export function Panel({
  title,
  description,
  className,
  children,
}: {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn('rounded-3xl border border-border/60 bg-card/60 p-5', className)}>
      <header className="mb-4">
        <h2 className="font-semibold">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </header>
      {children}
    </section>
  )
}
