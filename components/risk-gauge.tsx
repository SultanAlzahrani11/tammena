import { cn } from '@/lib/utils'
import { getPriority, toneClasses } from '@/lib/risk'

type RiskGaugeProps = {
  score: number
  size?: number
  className?: string
  label?: string
}

export function RiskGauge({ score, size = 220, className, label = 'مؤشر الخطورة' }: RiskGaugeProps) {
  const priority = getPriority(score)
  const tone = toneClasses(priority.tone)
  const stroke = 14
  const r = (size - stroke) / 2
  const circumference = Math.PI * r * 1.5
  const offset = circumference * (1 - score / 100)

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={score}
      aria-label={label}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[135deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${Math.PI * 2 * r}`}
          strokeLinecap="round"
          className="text-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${Math.PI * 2 * r}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('transition-[stroke-dashoffset,color] duration-700 ease-out', tone.text)}
          style={{ filter: 'drop-shadow(0 4px 8px color-mix(in oklch, currentColor 30%, transparent))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-bold tabular-nums">{score}</span>
        <span className="text-xs text-muted-foreground">من 100</span>
        <span
          className={cn(
            'mt-2 rounded-full border px-3 py-0.5 text-xs font-semibold',
            tone.text,
            tone.soft,
            tone.border,
          )}
        >
          {`أولوية ${priority.label}`}
        </span>
      </div>
    </div>
  )
}
