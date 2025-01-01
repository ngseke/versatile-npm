import { cn } from '@/lib/cn'
import { ComponentProps } from 'react'

const colors = {
  red: 'from-[var(--brand)] to-[#fe5196]',
  blue: 'from-[#4facfe] to-[#00f2fe]',
} as const

export function CodeVariable({ className, color, ...props }: ComponentProps<'code'> & {
  color: keyof typeof colors
}) {
  return (
    <code
      className={cn(
        'inline-block bg-gradient-to-tr bg-clip-text font-bold text-transparent',
        colors[color],
        className,
      )}
      {...props}
    />
  )
}
