import { cn } from '@/lib/cn'
import { ComponentProps, ElementType, JSX } from 'react'

const colors = {
  red: 'from-[var(--brand)] to-[#fe5196]',
  blue: 'from-[#4facfe] to-[#00f2fe]',
} as const

export function CodeVariable<Tag extends keyof JSX.IntrinsicElements = 'code'>({
  tag,
  className,
  color,
  ...props
}: ComponentProps<Tag> & {
  tag?: Tag
  color: keyof typeof colors
}) {
  const Component = (tag || 'code') as ElementType

  return (
    <Component
      className={cn(
        'inline-block bg-gradient-to-tr bg-clip-text font-bold text-transparent',
        colors[color],
        className,
      )}
      {...props}
    />
  )
}
