import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/presentation/components/shadcn-ui/drawer'
import { Menu, X } from 'lucide-react'
import { Separator } from '@/presentation/components/shadcn-ui/separator'
import { Button } from '../button'
import Logo from '@/root/public/embaixadoras-do-bem-logo.svg'
import Image from 'next/image'
import { scroll } from '@/presentation/utils/scroll-page'
import { useRouter } from 'next/router'

export function MobileNavbar() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  return (
    <Drawer direction={'left'} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className={'fixed top-4 right-4 z-30 sm:hidden'}>
        <Button Icon={Menu} />
      </DrawerTrigger>

      <DrawerContent
        className={'h-screen w-[80%] flex flex-col justify-center'}
      >
        <DrawerHeader className={'grid place-items-center'}>
          <Image src={Logo} alt={'logo'} className={'size-24'} />
        </DrawerHeader>
        <nav className={'p-4 gap-4 flex flex-col space-y-2 '}>
          <DrawerClose
            className={'items-center  flex flex-col justify-center gap-4'}
          >
            <Separator orientation={'horizontal'} className={'h-1 w-6'} />

            <Button
              className={'w-full'}
              href={'/'}
              onClick={() => setOpen(false)}
            >
              Home
            </Button>
            <Button
              className={'w-full'}
              href={'/projects'}
              onClick={() => setOpen(false)}
            >
              Projetos
            </Button>
            <Button
              className={'w-full'}
              href={'/blog'}
              onClick={() => setOpen(false)}
            >
              Blog
            </Button>
            <Button
              className={'w-full'}
              onClick={() => {
                setOpen(false)
                router.push('/').then(() => scroll('donate-section'))
              }}
            >
              Faça uma doação
            </Button>
            <Button
              className={'w-full'}
              onClick={() => {
                setOpen(false)
                router.push('/').then(() => scroll('volunteer-section'))
              }}
            >
              Seja voluntário
            </Button>
          </DrawerClose>

          <DrawerClose asChild>
            <Button className={'self-center'} Icon={X} />
          </DrawerClose>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
