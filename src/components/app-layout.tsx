import React, { ReactNode } from 'react'
import { Footer } from '@/components/footer/footer'
import { Navbar } from '@/components/navbar'


export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={'m-auto max-w-safe'}>{children}</main>
      <Footer />
    </>
  )
}
