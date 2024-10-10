import { createProjectDTOSchema } from '@/pages/api/_schemas/create-project-DTO.schema'
import z from 'zod'

export type ICreateProjectDTO = z.infer<typeof createProjectDTOSchema>
