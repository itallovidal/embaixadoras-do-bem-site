import { Button } from '../../global-components/button'
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
import { formatPostDescription } from '@/presentation/utils/format-post-description'
import { SubHeading } from '@/presentation/components/global-components/text/subheading'
import { deleteBlogPost } from '@/infra/adapters/delete-blog-post'

export function AdminPostCard({ post }: { post: IPost }): JSX.Element {
  const { toast } = useToast()
  const route = useRouter()
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [isEditLoading, setIsEditLoading] = useState(false)

  async function handleDelete() {
    setIsDeleteLoading(true)

    try {
      await deleteBlogPost(post.collectionId)
      await queryClient.invalidateQueries({
        queryKey: ['last-posts'],
      })
      toast({
        className: 'bg-green-600 text-white',
        title: 'Projeto excluído!',
        description: 'Projeto excluído com sucesso.',
      })
    } catch (e) {
      if (e instanceof Error) {
        console.log(e)
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
    console.log(post.collectionId)
    await route.push(`/admin/blog/edit-post/${post.id}`)
    setIsEditLoading(false)
  }

  return (
    <Dialog>
      <div
        className={
          'animate-showing opacity-0 flex flex-col items-center justify-center flex-1  gap-4 bg-gray-100 p-4 sm:max-w-[265px]'
        }
      >
        <SubHeading className={'text-subheading leading-12 line-clamp-2 '}>
          {post.title}
        </SubHeading>

        <div
          className={`leading-6 line-clamp-6 text-justify after:content-["..."]`}
          style={{ wordSpacing: '-2px' }}
        >
          {formatPostDescription(post.text)}
        </div>

        <div className={'my-4 space-y-4'}>
          <Button
            href={`/blog/${post.id}`}
            className={'w-full'}
            variant={'ghost'}
          >
            Ver postagem
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
