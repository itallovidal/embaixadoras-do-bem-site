import Image from 'next/image'
import { Button } from '../../global-components/button'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import { api } from '@/infra/lib/axios/axios'
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
import nookies from 'nookies'
import { useState } from 'react'

interface IProps {
  project: {
    image: string
    title: string
    id: string
    collectionId: string
  }
}

export function AdminProjectCard({
  project: { image, id, title, collectionId },
}: IProps) {
  const { toast } = useToast()
  const route = useRouter()
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [isEditLoading, setIsEditLoading] = useState(false)

  async function handleDelete() {
    setIsDeleteLoading(true)
    const cookies = nookies.get()

    try {
      const response = await api.delete(
        `/admin/projects/delete/${collectionId}/${id}`,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: 'Bearer ' + cookies['@EDB:user-token'],
          },
        },
      )

      if (response.status !== 200) {
        throw Error(`Failed to delete ${collectionId}`)
      }
      await queryClient.invalidateQueries({
        queryKey: ['last-projects'],
      })
      toast({
        className: 'bg-green-600 text-white',
        title: 'Projeto excluído!',
        description: 'Projeto excluído com sucesso.',
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
    await route.push(`/admin/projects/edit-project/${id}`)
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
            alt={'foto do projeto.'}
            className={'w-full h-full block object-cover'}
          />
        </picture>
        <Paragraph className={'line-clamp-1 '}>{title}</Paragraph>

        <div className={'my-4 space-y-4'}>
          <Button
            href={`/projects/${id}`}
            className={'w-full'}
            variant={'ghost'}
          >
            Ver projeto
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
          <DialogTitle>Tem Certeza que deseja excluir?</DialogTitle>
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
