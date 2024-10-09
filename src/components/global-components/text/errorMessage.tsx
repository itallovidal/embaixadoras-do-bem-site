import { HTMLProps } from 'react'

interface IProps extends HTMLProps<HTMLSpanElement> {
  children: string
}
export function ErrorMessage({ children, className, ...rest }: IProps) {
  return (
    <span className={`text-md text-rose-500 ${className}`} {...rest}>
      {children}
    </span>
  )
}
