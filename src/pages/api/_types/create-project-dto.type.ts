import { projectDTOSchema } from '@/pages/api/_schemas/project-d-t-o.schema'
import z from 'zod'

export type ICreateProjectDTO = z.infer<typeof projectDTOSchema>
