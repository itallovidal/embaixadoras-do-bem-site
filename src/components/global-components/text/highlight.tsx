import { HTMLProps } from 'react'

interface IProps extends HTMLProps<HTMLSpanElement> {
  children: string
  variant?: 'blue' | 'pink'
}

export function Highlight({ children, className, variant = 'pink' }: IProps) {
  const color = variant === 'pink' ? 'text-pink-dark' : 'text-blue-dark'
  return <span className={`${color} ${className}`}>{children}</span>
}
