import Image from 'next/image'
import { Button } from '../../../../global-components/button'
import { Paragraph } from '@/components/global-components/text/paragraph'
import { api } from '@/lib/axios/axios'
import { queryClient } from '@/lib/use-query/query-client'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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
  async function handleDelete() {
    try {
      await api.delete(`/admin/projects/delete/${collectionId}`)
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
  }

  return (
    <Dialog>
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
          <Button
            href={`/projects/${id}`}
            className={'w-full'}
            variant={'ghost'}
          >
            Ver projeto
          </Button>
          <Button className={'w-full'} variant={'default'}>
            Editar
          </Button>
          <DialogTrigger asChild>
            <Button className={'w-full'} variant={'outline'}>
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
          <DialogFooter className="sm:justify-center p-4">
            <DialogClose asChild>
              <Button variant={'default'} onClick={handleDelete}>
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
