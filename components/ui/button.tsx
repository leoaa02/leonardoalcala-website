import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border border-transparent text-sm font-semibold uppercase tracking-[0.14em] transition duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-0 aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--green)]',
        destructive:
          'bg-[var(--rust)] text-[var(--paper)] hover:bg-[var(--ink)]',
        outline:
          'border-[var(--ink)] bg-transparent text-[var(--ink)] hover:bg-[var(--paper-alt)]',
        secondary:
          'bg-[var(--paper-alt)] text-[var(--ink)] hover:bg-[var(--paper)]',
        ghost:
          'bg-transparent text-[var(--ink)] hover:bg-[var(--paper-alt)]',
        link: 'border-transparent text-[var(--green)] underline-offset-4 hover:text-[var(--rust)]',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
