import Image from 'next/image'
import { Button } from '../../global-components/button'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import { queryClient } from '@/infra/lib/use-query/query-client'
import { useToast } from '@/presentation/hooks/use-toast'
import {
  Dialog,
  DialogTrigger,
} from '@/presentation/components/shadcn-ui/dialog'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { TextHighlight } from '../../global-components/text/textHighlight'
import { deleteCollaborator } from '@/infra/adapters/collaborators/delete-collaborator'
import DeleteConfirmationDialog from '@/presentation/components/global-components/delete-confirmation-dialog/delete-confirmation-dialog'

interface IProps {
  collaborator: {
    image: string
    name: string
    id: string
    collectionId: string
    responsability: string
  }
}

export function AdminCollaboratorCard({
  collaborator: { image, id, name, collectionId, responsability },
}: IProps) {
  const { toast } = useToast()
  const route = useRouter()
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [isEditLoading, setIsEditLoading] = useState(false)

  async function handleDelete() {
    setIsDeleteLoading(true)

    try {
      await deleteCollaborator({ id, collectionId })
      await queryClient.invalidateQueries({
        queryKey: ['last-collaborators'],
      })
      toast({
        className: 'bg-green-600 text-white',
        title: 'Colaborador excluído!',
        description: 'Colaborador excluído com sucesso.',
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
    await route.push(`/admin/collaborators/edit/${id}`)
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
        <Paragraph className={'line-clamp-1 my-0'}>{name}</Paragraph>
        <TextHighlight
          className={'bg-white p-1 px-2 rounded-lg line-clamp-1 my-0'}
        >
          {responsability}
        </TextHighlight>

        <div className={'my-4 space-y-4'}>
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

      <DeleteConfirmationDialog handleDelete={handleDelete} />
    </Dialog>
  )
}
