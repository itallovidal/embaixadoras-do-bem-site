import { Input as ShadCnInput, InputProps } from '@/components/ui/input'
import { Textarea, TextareaProps } from '@/components/ui/textarea'

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
          className={'resize-none h-full leading-7'}
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
