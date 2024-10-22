import React, { ReactNode } from 'react'
import { Footer } from '@/presentation/components/global-components/footer/footer'
import { Inter } from 'next/font/google'
import { Toaster } from '@/presentation/components/shadcn-ui/toaster'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/infra/lib/use-query/query-client'
import { Navbar } from '@/presentation/components/global-components/navbar'

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
