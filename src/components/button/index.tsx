import { ComponentType } from 'react'
import { LucideProps } from 'lucide-react'
import { Button as ShadButton, ButtonProps } from '@/components/ui/button'
import Link from 'next/link'

interface NavButton extends ButtonProps {
  Icon?: ComponentType<LucideProps>
  children?: string
  href?: string
}

export function Button({ href, Icon, variant, children, ...props }: NavButton) {
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
        {Icon && <Icon />}
        {children && children}
      </>
    </ShadButton>
  )
}
