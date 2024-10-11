import { ICreateProjectDTO } from '@/pages/api/_types/create-project-dto.type'

type IGetProjectResponse = ICreateProjectDTO & {
  createdAt: Date
  updatedAt: Date
  images: string[]
  id: string
}
