import { ICreateProjectDTO } from '@/pages/api/_types/create-project-dto.type'

interface ITime {
  seconds: number
  nanoseconds: number
}

type IGetProjectResponse = Omit<ICreateProjectDTO, 'endDate' | 'startDate'> & {
  createdAt: ITime
  updatedAt: ITime
  endDate: ITime
  startDate: ITime
  images: string[]
  id: string
  collectionId: string
}
