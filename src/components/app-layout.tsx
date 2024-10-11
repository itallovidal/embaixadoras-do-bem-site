import React, { ReactNode } from 'react'
import { Footer } from '@/components/global-components/footer/footer'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/global-components/navbar'
import { Toaster } from '@/components/ui/toaster'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/use-query/query-client'

const inter = Inter({ subsets: ['latin'] })

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  )
}
