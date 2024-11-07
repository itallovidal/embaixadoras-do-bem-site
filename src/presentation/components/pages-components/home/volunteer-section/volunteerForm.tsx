import React from 'react'
import { Input } from '@/presentation/components/global-components/input/input'
import { Button } from '@/presentation/components/global-components/button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const volunteerSchema = z.object({
  name: z
    .string({
      required_error: 'Campo Obrigatório',
    })
    .min(3, {
      message: 'Mínimo de 3 caracteres.',
    }),
  profession: z
    .string({
      required_error: 'Campo Obrigatório',
    })
    .min(4, {
      message: 'Mínimo de 4 caracteres.',
    }),
  email: z.string({ required_error: 'Campo Obrigatório' }).email(),
  phone: z
    .string({
      required_error: 'Campo Obrigatório',
    })
    .regex(/^(\d{2})(9\d{8})$/, {
      message: 'Formato Incorreto.',
    }),
})

type IVolunteerSchema = z.infer<typeof volunteerSchema>

export function VolunteerForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IVolunteerSchema>({
    resolver: zodResolver(volunteerSchema),
  })

  console.log(errors)

  async function handleVolunteer(data: IVolunteerSchema) {
    console.log(data)
  }

  return (
    <form className={'md:flex md:flex-wrap md:gap-6 md:justify-end '}>
      <Controller
        control={control}
        render={({ field }) => (
          <Input
            errorMessage={errors.name?.message}
            labelVariant={'light'}
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
            labelVariant={'light'}
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
              labelVariant={'light'}
              field={'Telefone'}
              placeholder={'21 99999 9999'}
              {...field}
            />
          )}
          name={'phone'}
        />
        <span>Exemplo: 21963294746</span>
      </div>

      <Controller
        control={control}
        render={({ field }) => (
          <Input
            errorMessage={errors.profession?.message}
            labelVariant={'light'}
            field={'Área de Atuação'}
            placeholder={'Desenvolvedor Web'}
            {...field}
          />
        )}
        name={'profession'}
      />

      <Button
        onClick={handleSubmit(handleVolunteer)}
        variant={'outline'}
        className={'self-end'}
      >
        Me voluntariar!
      </Button>
    </form>
  )
}
