import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Heading } from '@/components/global-components/text/heading'
import { Input } from '@/components/global-components/input/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { loginSchema, TLoginSchema } from '@/types/schemas/login.schema'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/router'
import { login } from '@/utils/api/auth/login'
import { useMutation } from '@tanstack/react-query'

export default function Index() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  })
  const { toast } = useToast()
  const router = useRouter()

  const { mutateAsync } = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: async () => {
      toast({
        className: 'bg-green-600 text-white',
        title: 'Usuário logado',
        description: 'Usuário logado com sucessso!',
      })
      await router.push('/admin/dashboard')
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: error.message,
        description: String(error.cause),
      })
    },
  })

  async function handleLogin(data: TLoginSchema) {
    await mutateAsync(data)
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
