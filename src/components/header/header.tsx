import Image, { ImageProps } from 'next/image'
import { Separator } from '@/components/ui/separator'
import { SubHeading } from '@/components/global-components/text/subheading'

interface HeaderProps {
  img: ImageProps['src']
  alt: string
  title: string
  description?: string
  short?: boolean
}

export function Header({
  img,
  alt,
  title,
  description,
  short = false,
}: HeaderProps) {
  return (
    <header className={'gap-4 relative'}>
      <Image
        src={img}
        alt={alt}
        width={undefined}
        className={`w-full ${short ? `h-[370px]` : `h-[600px]`} object-cover`}
      />

      <div
        className={
          'absolute top-0 text-white h-full left-[calc((100%-var(--safe-mobile))/2)] xl:left-[calc((100%-var(--safe-desktop))/2)] content-center'
        }
      >
        {title && (
          <>
            <h1 className={'text-6xl'}>{title}</h1>
            <Separator
              orientation={'horizontal'}
              className={'bg-pink-dark my-5 py-1 w-[10%]'}
            />
          </>
        )}

        {description && (
          <SubHeading className={'w-[60%]'}>{description}</SubHeading>
        )}
      </div>
    </header>
  )
}
