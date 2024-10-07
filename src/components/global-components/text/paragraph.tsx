import { HTMLProps } from 'react'

interface IProps extends HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode
}
export function Paragraph({ children, className, ...rest }: IProps) {
  return (
    <p className={`text-md leading-8 ${className}`} {...rest}>
      {children}
    </p>
  )
}
