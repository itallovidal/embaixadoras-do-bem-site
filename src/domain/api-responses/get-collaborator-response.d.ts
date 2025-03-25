import { ICreateProjectDTO } from '@/pages/api/_types/create-project-dto.type'

interface ITime {
    seconds: number
    nanoseconds: number
}

type IGetCollaboratorResponse = {
    createdAt: ITime
    updatedAt: ITime
    name: string
    responsability: string
    images: string[]
    id: string
    collectionId: string
}
