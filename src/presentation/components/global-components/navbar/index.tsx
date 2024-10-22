import React from 'react'
import { DesktopNavbar } from '@/presentation/components/global-components/navbar/desktop-navbar'
import { MobileNavbar } from '@/presentation/components/global-components/navbar/mobile-navbar'

export function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  )
}
