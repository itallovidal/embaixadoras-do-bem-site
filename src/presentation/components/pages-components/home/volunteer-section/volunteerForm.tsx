import React from 'react'
import { Input } from '@/presentation/components/global-components/input/input'
import { Button } from '@/presentation/components/global-components/button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/infra/lib/axios/axios'
import { volunteerSchema } from '@/validation/volunteer.schema'
import { useToast } from '@/presentation/hooks/use-toast'

export function VolunteerForm() {
  const { toast } = useToast()
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IVolunteer>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      profession: '',
    },
  })

  console.log(errors)

  async function handleVolunteer(data: IVolunteer) {
    try {
      const response = await api.post('volunteer', data)
      if (response.status !== 200) {
        throw new Error('Error.')
      }
      toast({
        className: 'bg-green-600 text-white',
        title: 'Voluntariado com sucesso!',
        description:
          'Guardamos suas informações em nosso banco de dados. Entraremos em contato em breve!',
      })
    } catch (e) {
      console.log(e)
      toast({
        className: 'bg-red-600 text-white',
        title: 'Ops!',
        description: 'Tivemos um erro interno, tente novamente mais tarde.',
      })
    }
  }

  return (
    <form className={'md:flex md:flex-wrap md:gap-6 md:justify-end '}>
      <Controller
        control={control}
        render={({ field }) => (
          <Input
            errorMessage={errors.name?.message}
            labelVariant={'dark'}
            field={'Nome'}
            placeholder={'joão..'}
            {...field}
          />
        )}
        name={'name'}
      />

      <Controller
        control={control}
        render={({ field }) => (
          <Input
            errorMessage={errors.email?.message}
            labelVariant={'dark'}
            field={'Email'}
            placeholder={'joão@gmail.com'}
            {...field}
          />
        )}
        name={'email'}
      />
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              errorMessage={errors.phone?.message}
              labelVariant={'dark'}
              field={'Telefone'}
              placeholder={'21 99999 9999'}
              {...field}
            />
          )}
          name={'phone'}
        />
        <span className={'opacity-60'}>Exemplo: 21963294746</span>
      </div>

      <Controller
        control={control}
        render={({ field }) => (
          <Input
            errorMessage={errors.profession?.message}
            labelVariant={'dark'}
            field={'Área de Atuação'}
            placeholder={'Desenvolvedor Web'}
            {...field}
          />
        )}
        name={'profession'}
      />

      <Button
        disabled={isSubmitting}
        onClick={handleSubmit(handleVolunteer)}
        variant={'secondary'}
        className={'self-end'}
      >
        Me voluntariar!
      </Button>
    </form>
  )
}
