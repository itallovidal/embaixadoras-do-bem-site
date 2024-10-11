import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Home, Menu, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '../button'
import Logo from '@/assets/embaixadoras-do-bem-logo.svg'
import Image from 'next/image'

export function MobileNavbar() {
  return (
    <Drawer direction={'left'}>
      <DrawerTrigger asChild className={'fixed top-4 right-4 z-30 sm:hidden'}>
        <Button Icon={Menu} />
      </DrawerTrigger>

      <DrawerContent className={'h-screen w-[80%]'}>
        <DrawerHeader className={'grid place-items-center'}>
          <Image src={Logo} alt={'logo'} className={'size-24'} />
        </DrawerHeader>
        <nav className={'p-4 gap-4 flex flex-col space-y-2 '}>
          <DrawerClose
            className={'items-center  flex flex-col justify-center gap-4'}
          >
            <Separator orientation={'horizontal'} className={'h-1 w-6'} />

            <Button className={'w-full'}>Home</Button>
            {/* <Button className={'w-full'}>Blog</Button> */}
            <Button className={'w-full'}>Projetos</Button>
            {/* <Button className={'w-full'}>Doar</Button> */}
            {/* <Button className={'w-full'}>Seja Voluntário</Button> */}
          </DrawerClose>

          <DrawerClose asChild>
            <Button className={'self-center'} Icon={X} />
          </DrawerClose>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
