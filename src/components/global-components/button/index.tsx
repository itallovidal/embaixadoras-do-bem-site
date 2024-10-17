import React, { ComponentType } from 'react'
import { Loader2, LucideProps } from 'lucide-react'
import { Button as ShadButton, ButtonProps } from '@/components/ui/button'
import Link from 'next/link'

interface NavButton extends ButtonProps {
  Icon?: ComponentType<LucideProps>
  children?: string
  href?: string
  isLoading?: boolean
}

export function Button({
  href,
  Icon,
  variant,
  isLoading,
  children,
  ...props
}: NavButton) {
  if (isLoading)
    return (
      <ShadButton
        disabled={true}
        className={'gap-2'}
        variant={variant}
        {...props}
      >
        <>
          {<Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children && children}
        </>
      </ShadButton>
    )

  if (href) {
    return (
      <ShadButton variant={variant} asChild {...props}>
        <Link href={href} className={'gap-2'}>
          {Icon && <Icon />}
          {children && children}
        </Link>
      </ShadButton>
    )
  }

  return (
    <ShadButton className={'gap-2'} variant={variant} {...props}>
      <>
        {Icon && <Icon className={'mr-4'} />}
        {children && children}
      </>
    </ShadButton>
  )
}
