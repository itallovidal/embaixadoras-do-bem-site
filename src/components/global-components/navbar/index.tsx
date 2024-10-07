import React from 'react'
import { DesktopNavbar } from '@/components/global-components/navbar/desktop-navbar'
import { MobileNavbar } from '@/components/global-components/navbar/mobile-navbar'

export function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  )
}
