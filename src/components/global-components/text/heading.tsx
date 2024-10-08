import { HTMLProps } from 'react'

interface IProps extends HTMLProps<HTMLHeadingElement> {
  children: string
}

export function Heading({ children, ...rest }: IProps) {
  return <h1 className={`text-heading ${rest.className}`}>{children}</h1>
}
