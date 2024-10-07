import React, { HTMLProps } from 'react'

interface IProps extends HTMLProps<HTMLHeadingElement> {
  children: string
}

export function SubHeading({ children, className, ...rest }: IProps) {
  return (
    <h2 {...rest} className={`text-subheading font-semibold ${className}`}>
      {children}
    </h2>
  )
}
