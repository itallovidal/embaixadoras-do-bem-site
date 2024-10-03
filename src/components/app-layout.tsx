import React, { ReactNode } from 'react'
import { Footer } from '@/components/footer/footer'
import { Navbar } from '@/components/navbar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className={inter.className}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
