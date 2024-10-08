import { Checkbox as ShadCNCheckbox } from '@/components/ui/checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'

interface IProps extends CheckboxProps {
  description: string
  title: string
}

export function Checkbox({ title, description, ...rest }: IProps) {
  return (
    <div className="items-top flex space-x-2">
      <ShadCNCheckbox {...rest} id={rest.id} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={rest.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {title}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
