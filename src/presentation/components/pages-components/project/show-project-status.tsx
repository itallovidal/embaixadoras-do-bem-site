import React from 'react'
import { TextHighlight } from '@/presentation/components/global-components/text/textHighlight'

interface Props {
  project: {
    isActive?: boolean
    startDate?: string
    endDate?: string
  }
}

export function ShowProjectStatus({
  project: { isActive, endDate, startDate },
}: Props) {
  const textToDisplay = isActive
    ? 'Projeto ainda ativo'
    : `Data da finalização do projeto <TextHighlight>${endDate}</TextHighlight>`

  if (startDate)
    return (
      <div className={'mt-8'}>
        <p>
          Data do inicio do projeto <TextHighlight>{startDate}</TextHighlight>
        </p>
        <p className={'italic'}>{textToDisplay}</p>
      </div>
    )
}
