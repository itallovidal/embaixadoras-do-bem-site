import {
  Card,
  CardHeader,
  CardTitle,
} from '@/presentation/components/shadcn-ui/card'
import Image from 'next/image'
import { IGetPartnershipResponse } from '@/domain/api-responses/partnership/get-partnership-response'
import EmptyImage from '@/root/public/empty-image.png'

export function PartnershipCard({ image, name }: IGetPartnershipResponse) {
  return (
    <Card
      className={
        'animate-showing opacity-0 w-full flex flex-col md:w-[calc(theme(width.1/4)-theme(gap.3))]'
      }
    >
      <CardHeader className={'p-0 flex-1'}>
        <picture
          className={'overflow-hidden rounded-lg h-full  md:max-w-[550px]'}
        >
          <Image
            className={'w-full h-full block object-cover'}
            width={580}
            src={image || EmptyImage}
            height={600}
            alt={'Foto da parceria'}
          />
        </picture>
        <CardTitle className={'p-4 text-base flex justify-center my-0'}>
          {name}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
