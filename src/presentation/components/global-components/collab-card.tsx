import Image from 'next/image'
import { Paragraph } from './text/paragraph'
import { TextHighlight } from './text/textHighlight'

interface Props {
  name: string
  responsability: string
  images: string[]
}

export function CollabCard({ collab }: { collab: Props }) {
  return (
    <div
      className={
        'animate-showing w-full flex flex-col md:w-[calc(theme(width.1/3)-theme(gap.3))]'
      }
    >
      <picture
        className={
          'border-solid self-center border border-gray-400 overflow-hidden block rounded-full w-[200px] h-[200px]'
        }
      >
        <Image
          className={'w-full block object-cover'}
          width={200}
          height={200}
          src={collab.images[0]}
          alt={`Foto do voluntário ${collab.name}`}
        />
      </picture>
      <div className="flex flex-col">
        <Paragraph className="my-0 text-center">{collab.name}</Paragraph>
        <TextHighlight className="bg-gray-100 p-2 px-4 rounded-md text-center">
          {collab.responsability}
        </TextHighlight>
      </div>
    </div>
  )
}
