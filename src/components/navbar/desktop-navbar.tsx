import React from 'react'
import Logo from '../../assets/embaixadoras-do-bem-logo.svg'
import { Button } from '@/components/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

export function DesktopNavbar() {
  return (
    <div
      className={
        'border-b hidden sm:block bg-pink-dark navbar-detail relative '
      }
    >
      <div className={'max-w-safe m-auto'}>
        <div
          className={
            'flex h-16 items-center justify-between gap-6  relative z-10 overflow-hidden'
          }
        >
          <div
            className={
              'relative h-full logo-detail flex justify-center items-center '
            }
          >
            <Image src={Logo} alt={'logo'} className={'h-12 w-12'} />
          </div>

          <nav className={'flex items-center space-x-4 lg:space-x-6'}>
            <Button variant={'lightGhost'} href={'/'}>
              Home
            </Button>
            <Separator orientation={'vertical'} className={'h-6'} />
            <Button variant={'lightGhost'} href={'/'}>
              Blog
            </Button>
            <Separator orientation={'vertical'} className={'h-6'} />
            <Button variant={'lightGhost'} href={'/'}>
              Projetos
            </Button>
            <Separator orientation={'vertical'} className={'h-6'} />
            <Button variant={'lightGhost'} href={'/'}>
              Faça uma doação
            </Button>
            <Separator orientation={'vertical'} className={'h-6'} />
            <Button variant={'lightGhost'} href={'/'}>
              Seja Voluntário
            </Button>
          </nav>
        </div>
      </div>
    </div>
  )
}
