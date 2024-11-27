/* eslint-disable @typescript-eslint/no-unused-vars */

import { Input } from '@/presentation/components/global-components/input/input'
import { Heading } from '@/presentation/components/global-components/text/heading'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/presentation/hooks/use-toast'
import { ArrowLeft } from 'lucide-react'
import { GetServerSideProps } from 'next'
import { Button } from '@/presentation/components/global-components/button'
import { useRouter } from 'next/router'
import { blogPostSchema, TBlogPostSchema } from '@/validation/blogPost.schema'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/shadcn-ui/card'
import { SubHeading } from '@/presentation/components/global-components/text/subheading'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/shadcn-ui/select'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getBlogtDetails } from '@/infra/adapters/blog/post/get-blog-post-details'
import { getBlogTags } from '@/infra/adapters/blog/tag/get-blog-tags'
import { editPost } from '@/infra/adapters/blog/post/edit-blog-post'
import BlogPost from '@/presentation/components/global-components/blog-post/blog-post'

interface IEditPostProps {
  post: IPost
  tags: IBlogPostsTag[]
}

function EditPost({ post, tags }: IEditPostProps) {
  const router = useRouter()
  const { toast } = useToast()
  const {
    watch,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TBlogPostSchema>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      author: post.author,
      title: post.title,
      text: post.text,
      tagId: post.tagId,
    },
  })

  async function handleEditBlogPost(form: TBlogPostSchema) {
    try {
      await editPost({
        post: form,
        collectionId: post.collectionId,
      })
      toast({
        className: 'bg-green-600 text-white',
        title: 'Publicação salva!',
        description: 'Publicação salva com sucesso.',
      })
      await router.push('/admin/dashboard')
      reset()
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

  const previewText = watch('text')

  return (
    <div className={'max-w-safeMobile xl:max-w-safeDesktop m-auto my-24'}>
      <div
        className={
          'flex flex-col-reverse items-start justify-between sm:flex-row sm:gap-5 sm:items-center'
        }
      >
        <Heading className={'mb-4'}>Edição da publicação</Heading>

        <div className={' flex justify-end sm:my-5'}>
          <Button href={'/admin/dashboard'} Icon={ArrowLeft} variant={'ghost'}>
            Voltar
          </Button>
        </div>
      </div>
      <Card className={'mb-12'}>
        <CardHeader>
          <CardTitle>Guia</CardTitle>
          <CardDescription>
            Guia de como organizar o contedo do seu artigo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubHeading>Como inserir Titulos?</SubHeading>
          <Paragraph>
            Basta utilizar 'Jogo da Velha'. <br /> Exemplo: # Título 1 → Título
            principal <br /> ## Título 2 → Subtítulo
          </Paragraph>

          <SubHeading>Como usar itálico?</SubHeading>
          <Paragraph>
            Para itálico, use um asterisco (*) antes e depois da palavra: <br />{' '}
            Exemplo: *Texto em itálico*
          </Paragraph>

          <SubHeading>Como usar negrito?</SubHeading>
          <Paragraph>
            Para negrito, coloque o texto entre dois asteriscos (**): <br />
            Exemplo: **Texto em negrito**
          </Paragraph>

          <SubHeading>Como usar lista?</SubHeading>
          <Paragraph>
            Para usar listas, basta colocar um travessão (-): <br />
            Exemplo: - item 1
          </Paragraph>
        </CardContent>
        <CardFooter>
          <p>Veja o Resultado no campo de pré-visualização</p>
        </CardFooter>
      </Card>

      <div className={'flex flex-col sm:flex-row gap-12'}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={'p-4 bg-gray-200 rounded-lg gap-8 flex flex-col flex-1 '}
        >
          <div className={'flex gap-4 flex-col lg:flex-row sticky top-24'}>
            <div className={'flex flex-col flex-1 gap-4 '}>
              <Controller
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <Input
                    className="max-w-[280px]"
                    field={'Nome da publicação'}
                    errorMessage={errors.title?.message}
                    {...rest}
                    disabled={isSubmitting}
                  />
                )}
                name={'title'}
              />

              <Controller
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <Input
                    className={'h-[500px]'}
                    wrapperStyle={'h-full'}
                    field={'Artigo'}
                    placeholder={'Conte os detalhes..'}
                    errorMessage={errors.text?.message}
                    isMultiline
                    {...rest}
                    disabled={isSubmitting}
                  />
                )}
                name={'text'}
              />

              <div
                className={`flex flex-row gap-4 ${errors.author?.message ? 'items-center' : 'items-end'}`}
              >
                <Controller
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <Input
                      field={'Autor(a)'}
                      errorMessage={errors.author?.message}
                      {...rest}
                      disabled={isSubmitting}
                    />
                  )}
                  name={'author'}
                />

                <Select
                  onValueChange={(value) => setValue('tagId', value)}
                  defaultValue={post.tagId}
                >
                  <SelectTrigger className="max-w-[280px]">
                    <SelectValue placeholder="Selecione a Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {tags &&
                      tags.map((tag) => (
                        <SelectItem
                          key={tag.id}
                          className={'cursor-pointer'}
                          value={tag.id}
                        >
                          {tag.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>

        <div className={'blog-content flex-1'}>
          <Heading className={'text-pink-dark'}>Pré Visualização</Heading>
          {previewText.length === 0 && (
            <Paragraph>
              {' '}
              Comece a escrever o artigo para mostrar aqui.
            </Paragraph>
          )}
          <div>
            <BlogPost
              tagId={watch('tagId')}
              author={watch('author')}
              text={watch('text')}
              title={watch('title')}
            />
          </div>
        </div>
      </div>

      <Button
        isLoading={isSubmitting}
        onClick={handleSubmit(handleEditBlogPost)}
        className={'self-center my-12 w-full md:w-fit'}
      >
        Salvar publicação
      </Button>
    </div>
  )
}

export default EditPost

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const post = await getBlogtDetails(id)
  const tags = await getBlogTags()

  return {
    props: { post, tags },
  }
}
