import Image from 'next/image'
import { Trash } from 'lucide-react'

interface SelectedImageCardProps {
  id: string
  src: string
  name: string
  onDelete: (id: string) => void
}

export function SelectedImageCard({
  name,
  src,
  id,
  onDelete,
}: SelectedImageCardProps) {
  return (
    <picture className={'relative rounded-md w-[200px]'}>
      <Image
        src={src}
        alt={name}
        key={id}
        className={'object-contain rounded-md w-full block'}
        width={350}
        height={450}
      />
      <button
        onClick={() => onDelete(id)}
        className={
          'absolute -top-2 -right-2 p-2 bg-red-500 rounded-full transition hover:scale-150'
        }
      >
        <Trash className={'text-white'} size={18} />
      </button>
    </picture>
  )
}
