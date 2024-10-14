import { useToast } from '@/hooks/use-toast'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Heading } from '@/components/global-components/text/heading'
import { Input } from '@/components/global-components/input/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { loginSchema, TLoginSchema } from '@/types/schemas/login.schema'
import { useRouter } from 'next/router'

export default function Login() {
  const { toast } = useToast()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  async function handleLogin(data: TLoginSchema) {
    try {
      console.log(data)
      toast({
        className: 'bg-green-600 text-white',
        title: 'Usuário logado',
        description: 'Usuário logado com sucessso!',
      })
      router.push('/admin/dashboard')
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
    <div
      className={'max-w-safeMobile xl:max-w-safeDesktop m-auto my-24 w-[400px]'}
    >
      <Heading className={'mb-4'}>Login</Heading>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={'px-4 py-10 bg-gray-200 rounded-lg gap-8 flex flex-col'}
      >
        <div className={'flex gap-4 flex-col'}>
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                field={'Email'}
                placeholder={'@email-exemplo@gmail.com'}
                errorMessage={errors.email?.message}
                {...field}
                disabled={isSubmitting}
                type={'email'}
              />
            )}
            name={'email'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                field={'Senha'}
                placeholder={'**********'}
                errorMessage={errors.password?.message}
                {...field}
                disabled={isSubmitting}
                type={'password'}
              />
            )}
            name={'password'}
          />
        </div>
      </form>

      <Button
        disabled={isSubmitting}
        onClick={handleSubmit(handleLogin)}
        className={'self-center my-8'}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Entrar
      </Button>
    </div>
  )
}
