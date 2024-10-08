import { Input as ShadCnInput, InputProps } from '@/components/ui/input'
import { Textarea, TextareaProps } from '@/components/ui/textarea'
import { HTMLProps } from 'react'
import TailwindConfig from 'tailwindcss/stubs/tailwind.config'

interface IProps extends InputProps {
  field: string
  labelVariant?: 'light' | 'dark'
  isMultiline?: boolean
  wrapperStyle?: string
}

export function Input({
  field,
  isMultiline = false,
  labelVariant = 'dark',
  wrapperStyle,
  ...rest
}: IProps) {
  const color = labelVariant === 'light' ? 'text-white' : 'text-black'

  if (isMultiline) {
    return (
      <div className={`flex flex-col gap-4 ${wrapperStyle}`}>
        <label className={color}>{field}</label>
        <Textarea
          className={'resize-none h-full'}
          // rows={4}
          {...(rest as TextareaProps)}
        />
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${wrapperStyle}`}>
      <label className={color}>{field}</label>
      <ShadCnInput {...(rest as InputProps)} />
    </div>
  )
}
