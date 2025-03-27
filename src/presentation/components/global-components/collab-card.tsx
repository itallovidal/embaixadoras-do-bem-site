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
    <div className={'w-auto flex flex-col items-center'}>
      <picture
        className={
          'border-solid border border-gray-400 overflow-hidden block rounded-full w-[80px] h-[80px]  mb-4'
        }
      >
        <Image
          className={'w-full block object-cover'}
          width={100}
          height={100}
          src={collab.images[0]}
          alt={`Foto do colaborador ${collab.name}`}
        />
      </picture>
      <div className="flex flex-col gap-2">
        <Paragraph className="my-0 text-center">{collab.name}</Paragraph>
        <TextHighlight className="bg-gray-100 p-2 px-4 rounded-md">
          {collab.responsability}
        </TextHighlight>
      </div>
    </div>
  )
}
