import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/presentation/components/shadcn-ui/popover'
import { cn } from '@/presentation/utils/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/presentation/components/shadcn-ui/calendar'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import { Button } from '@/presentation/components/shadcn-ui/button'
import { ErrorMessage } from '@/presentation/components/global-components/text/errorMessage'

interface IProps {
  label: string
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  isDisabled?: boolean
  errorMessage?: string
}

export function DateTimePicker({
  label,
  date,
  setDate,
  isDisabled,
  errorMessage = undefined,
}: IProps) {
  return (
    <div className={'flex flex-col gap-2 w-full'}>
      <Paragraph>{label}</Paragraph>
      <Popover>
        <PopoverTrigger asChild disabled={isDisabled}>
          <Button
            variant={'ghost'}
            className={cn(
              'w-full justify-start text-left font-normal bg-white',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date
              ? format(date, 'PPP', {
                  locale: ptBR,
                })
              : 'Selecione uma data.'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Popover>
    </div>
  )
}
