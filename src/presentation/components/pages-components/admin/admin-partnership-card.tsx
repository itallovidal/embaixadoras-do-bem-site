import Image from 'next/image'
import { Button } from '../../global-components/button'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import { queryClient } from '@/infra/lib/use-query/query-client'
import { useToast } from '@/presentation/hooks/use-toast'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/presentation/components/shadcn-ui/dialog'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IGetPartnershipResponse } from '@/domain/api-responses/partnership/get-partnership-response'
import { deletePartnership } from '@/infra/adapters/partnership/delete-project'

interface IProps {
  partnership: IGetPartnershipResponse
}

export function AdminPartnershipCard({
  partnership: { image, id, name, collectionId },
}: IProps) {
  const { toast } = useToast()
  const route = useRouter()
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [isEditLoading, setIsEditLoading] = useState(false)

  async function handleDelete() {
    setIsDeleteLoading(true)

    try {
      await deletePartnership({ id, collectionId })
      await queryClient.invalidateQueries({
        queryKey: ['last-partnerships'],
      })
      toast({
        className: 'bg-green-600 text-white',
        title: 'Parceria excluída!',
        description: 'Parceria excluída com sucesso.',
      })
    } catch (e) {
      if (e instanceof Error) {
        toast({
          variant: 'destructive',
          title: e.message,
          description: e.cause as string,
        })
      }
    }

    setIsDeleteLoading(false)
  }

  async function handleEdit() {
    setIsEditLoading(true)
    await route.push(`/admin/partnership/edit-partnership/${id}`)
    setIsEditLoading(false)
  }

  return (
    <Dialog>
      <div
        className={
          'animate-showing opacity-0 flex flex-col items-center justify-center flex-1  gap-4 bg-gray-100 p-4 sm:max-w-[265px]'
        }
      >
        <picture className={'w-[200px] h-[200px] rounded overflow-hidden'}>
          <Image
            width={300}
            height={300}
            src={image}
            alt={'foto da parceria.'}
            className={'w-full h-full block object-cover'}
          />
        </picture>
        <Paragraph className={'line-clamp-1 '}>{name}</Paragraph>

        <div className={'my-4 space-y-4'}>
          <Button
            href={`/partnership/${id}`}
            className={'w-full'}
            variant={'ghost'}
          >
            Ver parceiria
          </Button>
          <Button
            className={'w-full'}
            variant={'default'}
            onClick={() => handleEdit()}
            isLoading={isEditLoading}
          >
            Editar
          </Button>
          <DialogTrigger asChild>
            <Button
              className={'w-full'}
              variant={'outline'}
              isLoading={isDeleteLoading}
            >
              Excluir
            </Button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
          <DialogDescription>
            A exclusão é permanente, pense bem antes de realizá-la.
          </DialogDescription>
          <DialogFooter className={'flex flex-row gap-5 justify-center p-4'}>
            <DialogClose asChild>
              <Button variant={'default'} onClick={() => handleDelete()}>
                Excluir
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant={'outline'}>Desistir</Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
