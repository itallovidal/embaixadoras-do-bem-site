import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import { Button } from '@/components/global-components/button'
import { Paragraph } from '@/components/global-components/text/paragraph'

interface IProps {
  label: string
}

export function DateTimePicker({ label }: IProps) {
  const [date, setDate] = useState<Date>()

  return (
    <div className={'block'}>
      <Paragraph>{label}</Paragraph>
      <Popover>
        <PopoverTrigger>
          <Button
            Icon={CalendarIcon}
            variant={'ghost'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
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
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
