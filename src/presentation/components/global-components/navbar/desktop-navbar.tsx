import React from 'react'
import Logo from '../../../../../public/embaixadoras-do-bem-logo.svg'
import { Button } from '../button'
import { Separator } from '@/presentation/components/shadcn-ui/separator'
import Image from 'next/image'
import { scroll } from '@/presentation/utils/scroll-page'

export function DesktopNavbar() {
  return (
    <div
      className={
        'hidden fixed w-full top-0 z-30 sm:block bg-pink-dark navbar-detail '
      }
    >
      <div className={'max-w-safeDesktop m-auto'}>
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
            <Button variant={'lightGhost'} href={'/projects'}>
              Projetos
            </Button>
            <Separator orientation={'vertical'} className={'h-6'} />
            <Button variant={'lightGhost'} href={'/blog'}>
              Blog
            </Button>
            <Separator orientation={'vertical'} className={'h-6'} />
            <Button
              variant={'lightGhost'}
              onClick={() => scroll('#donate-section')}
            >
              Faça uma doação
            </Button>
            <Separator orientation={'vertical'} className={'h-6'} />
            <Button
              variant={'lightGhost'}
              onClick={() => scroll('#volunteer-section')}
            >
              Seja voluntário
            </Button>
          </nav>
        </div>
      </div>
    </div>
  )
}
