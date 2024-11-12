import { HTMLProps } from 'react'

interface IProps extends HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode
}
export function Paragraph({ children, className, ...rest }: IProps) {
  return (
    <p
      className={`text-md leading-7  ${!className?.includes('text-center') ? 'text-justify' : 'text-center'} ${className} my-6`}
      {...rest}
      style={{ wordSpacing: '-2px' }}
    >
      {children}
    </p>
  )
}
