import { HTMLProps } from 'react'

interface IProps extends HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode
}
export function Paragraph({ children, className, ...rest }: IProps) {
  return (
    <p
      className={`text-md leading-7 my-6 ${!className?.includes('text-center') ? 'text-justify' : 'text-center'} ${className} `}
      {...rest}
    >
      {children}
    </p>
  )
}
