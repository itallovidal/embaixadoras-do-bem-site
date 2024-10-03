import React from 'react'

export function Heading({ children }: { children: string }) {
  return (
    <h1 className={'text-heading'}>
      <strong>{children}</strong>
    </h1>
  )
}

export function SubHeading({
  children,
  style,
}: {
  children: string
  style?: string
}) {
  return (
    <h2 className={`text-subheading font-semibold ${style}`}>{children}</h2>
  )
}

export function Paragraph({
  children,
  style,
}: {
  children: any
  style?: string
}) {
  return <p className={`text-md leading-8 ${style}`}>{children}</p>
}

export function Highlight({ children }: { children: string }) {
  return <span className={'text-pink-dark'}>{children}</span>
}
