import Image from 'next/image'
import { Button } from '../../../../global-components/button'
import { Paragraph } from '@/components/global-components/text/paragraph'

interface IProps {
  project: {
    image: string
    title: string
    id: string
  }
}

export function AdminProjectCard({ project: { image, id, title } }: IProps) {
  return (
    <div
      className={
        'flex flex-col items-center justify-center flex-1 max-w-[265px] gap-4 bg-gray-100 p-4'
      }
    >
      <picture className={'w-[200px] h-[200px] rounded overflow-hidden'}>
        <Image
          width={300}
          height={300}
          src={image}
          alt={'foto do projeto.'}
          className={'w-full h-full block object-cover'}
        />
      </picture>
      <Paragraph className={'line-clamp-1 '}>{title}</Paragraph>

      <div className={'my-4 space-y-4'}>
        <Button href={`/projects/${id}`} className={'w-full'} variant={'ghost'}>
          Ver
        </Button>
        <Button className={'w-full'} variant={'default'}>
          Editar
        </Button>
        <Button className={'w-full'} variant={'outline'}>
          Excluir
        </Button>
      </div>
    </div>
  )
}
