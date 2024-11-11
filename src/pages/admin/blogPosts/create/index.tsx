import { Input } from '@/presentation/components/global-components/input/input'
import { Heading } from '@/presentation/components/global-components/text/heading'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/presentation/hooks/use-toast'
import { ArrowLeft } from 'lucide-react'
import { getServerSideProps } from '@/gssp-admin-cookies'
import { Button } from '../../../../presentation/components/global-components/button'
import { blogPostSchema, TBlogPostSchema } from '@/validation/blogPost.schema'
import { useQuery } from '@tanstack/react-query'
import { getBlogPostsTags } from '@/infra/adapters/get-blogPostsTags'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/presentation/components/shadcn-ui/select'
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
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function Index() {
  // const router = useRouter()
  const { toast } = useToast()
  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TBlogPostSchema>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      author: '',
      title: '',
      text: '',
      tagId: '',
    },
  })

  const { data: tags } = useQuery({
    queryKey: ['get-blogPostTags'],
    queryFn: () => getBlogPostsTags(),
  })

  async function handleCreateBlogPost(data: TBlogPostSchema) {
    try {
      // await createBlogPost(data)
      toast({
        className: 'bg-green-600 text-white',
        title: 'Publicação enviada!',
        description: 'Publicação enviada com sucesso.',
      })
      // await router.push('/admin/dashboard')
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
    <div className={'max-w-safeMobile xl:max-w-safeDesktop m-auto my-24'}>
      <div
        className={
          'flex flex-col-reverse items-start justify-between sm:flex-row sm:gap-5 sm:items-center'
        }
      >
        <Heading className={'mb-4'}>Criação da publicação</Heading>

        <div className={' flex justify-end sm:my-5'}>
          <Button href={'/admin/dashboard'} Icon={ArrowLeft} variant={'ghost'}>
            Voltar
          </Button>
        </div>
      </div>
      <Card className={'my-12'}>
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
        </CardContent>
        <CardFooter>
          <p>Veja o Resultado no campo de pré-visualização</p>
        </CardFooter>
      </Card>

      <form
        onSubmit={(e) => e.preventDefault()}
        className={'p-4 bg-gray-200 rounded-lg gap-8 flex flex-col'}
      >
        <div className={'flex gap-4 flex-col lg:flex-row'}>
          <div className={'flex flex-col flex-1 gap-4 '}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  className="max-w-[280px]"
                  field={'Título da publicação'}
                  errorMessage={errors.title?.message}
                  {...field}
                  disabled={isSubmitting}
                />
              )}
              name={'title'}
            />

            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  className={'h-[500px]'}
                  wrapperStyle={'h-full'}
                  field={'Artigo'}
                  placeholder={'Conte os detalhes..'}
                  errorMessage={errors.text?.message}
                  isMultiline
                  {...field}
                  disabled={isSubmitting}
                />
              )}
              name={'text'}
            />

            <div className={'flex flex-row gap-4 items-end'}>
              <Controller
                control={control}
                render={({ field }) => (
                  <Input
                    field={'Autor(a)'}
                    errorMessage={errors.author?.message}
                    {...field}
                    disabled={isSubmitting}
                  />
                )}
                name={'author'}
              />

              <Select onValueChange={(value) => setValue('tagId', value)}>
                <SelectTrigger className="max-w-[280px]">
                  <SelectValue placeholder="Selecione a Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {tags &&
                    tags.map((tag) => (
                      <SelectItem className={'cursor-pointer'} value={tag.id}>
                        {tag.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </form>

      <div id={'preview-form'} className={'my-12'}>
        <Heading className={'text-pink-dark'}>Pré Visualização</Heading>
        <Markdown remarkPlugins={[remarkGfm]}>{watch('text')}</Markdown>
      </div>

      <Button
        isLoading={isSubmitting}
        onClick={handleSubmit(handleCreateBlogPost)}
        className={'self-center my-12 w-full md:w-fit'}
      >
        Criar projeto
      </Button>
    </div>
  )
}

export default Index

export { getServerSideProps }

// <Controller
//     control={control}
//     name={'tagId'}
//     render={({ field }) => (
//         <div>
//           <Select
//               onValueChange={(value) => {
//                 field.onChange(value)
//                 setValue('tagId', value)
//               }}
//               value={field.value}
//               defaultValue={field.value}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Selecione uma tag" />
//             </SelectTrigger>
//             <SelectContent>
//               {data?.map((tag) => (
//                   <SelectItem key={tag.id} value={tag.id}>
//                     {tag.name}
//                   </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//     )}
// />
