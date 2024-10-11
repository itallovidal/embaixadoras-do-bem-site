import React, { HTMLProps, ReactNode } from 'react'

interface IProps extends HTMLProps<HTMLHeadingElement> {
  children: ReactNode
}

export function SubHeading({ children, className, ...rest }: IProps) {
  return (
    <h2 {...rest} className={`text-subheading font-semibold ${className}`}>
      {children}
    </h2>
  )
}
