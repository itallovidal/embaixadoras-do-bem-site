import { Checkbox as ShadCNCheckbox } from '@/presentation/components/shadcn-ui/checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'
import { ErrorMessage } from '@/presentation/components/global-components/text/errorMessage'

interface IProps extends CheckboxProps {
  description: string
  title: string
  errorMessage?: string
}

export function Checkbox({
  title,
  description,
  errorMessage,
  ...rest
}: IProps) {
  return (
    <div className="items-top flex space-x-2">
      <ShadCNCheckbox onClick={rest.onChange} {...rest} id={rest.id} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={rest.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {title}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    </div>
  )
}
