import { TProjectSchema } from '@/types/schemas/project.schema'

interface IResponseError {
  title: string
  description: string
  status: number
  details?: {
    code: number
    message: string
  }
}

interface IImgToAdd {
  file: File
  id: string
}

interface IImgToRemove {
  src: string
}
