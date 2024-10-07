import React from 'react'
import { Input as ShadCnInput, InputProps } from '@/components/ui/input'

interface IProps extends InputProps {
  field: string
  labelVariant?: 'light' | 'dark'
}

export function Input({ field, labelVariant = 'dark', ...rest }: IProps) {
  const color = labelVariant === 'light' ? 'text-white' : 'text-black'

  return (
    <div className={'space-y-4'}>
      <label className={color}>{field}</label>
      <ShadCnInput {...rest} />
    </div>
  )
}
