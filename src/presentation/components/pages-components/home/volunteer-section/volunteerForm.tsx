import React from 'react'
import { Input } from '@/presentation/components/global-components/input/input'
import { Button } from '@/presentation/components/global-components/button'

export function Form() {
  return (
    <form className={'md:flex md:flex-wrap md:gap-6 md:justify-end '}>
      <Input labelVariant={'light'} field={'Nome'} placeholder={'joão..'} />

      <Input labelVariant={'light'} field={'Email'} placeholder={'joão..'} />

      <Input labelVariant={'light'} field={'Telefone'} placeholder={'joão..'} />

      <Input
        labelVariant={'light'}
        field={'Área de Atuação'}
        placeholder={'joão..'}
      />
      <Button variant={'outline'} className={'self-end'}>
        Me voluntariar!
      </Button>
    </form>
  )
}
