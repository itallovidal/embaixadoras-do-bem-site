import React from 'react'

export function Heading({ children }: { children: string }) {
  return (
    <h1 className={'text-heading'}>
      <strong>{children}</strong>
    </h1>
  )
}
