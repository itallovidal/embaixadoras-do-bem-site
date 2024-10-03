import React from 'react'
import { DesktopNavbar } from '@/components/navbar/desktop-navbar'
import { MobileNavbar } from '@/components/navbar/mobile-navbar'

export function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  )
}
