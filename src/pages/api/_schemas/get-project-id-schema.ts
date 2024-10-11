import { z } from 'zod'

export const createProjectDTOSchema = z
  .string({
    required_error: 'ID inválido ou inexistente.',
  })
  .uuid({
    message: 'O ID precisa ser um UUID.',
  })
