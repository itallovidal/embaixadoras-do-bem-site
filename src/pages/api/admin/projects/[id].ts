import type { NextApiRequest, NextApiResponse } from 'next'
import { databaseRepository } from '@/pages/api/_domain/db'
import { idSchema } from '@/pages/api/_schemas/get-project-id-schema'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const { id: urlID } = req.query

  const idParsed = idSchema.safeParse(urlID)

  if (!idParsed.success) {
    const error = new ErrorEntity(
      'ID inválido.',
      'O ID fornecido não possui uma estrutura de ID correta.',
      400,
    )
    return res.status(error.status).json({ error: error.getError() })
  }

  const id = idParsed.data

  const response = await databaseRepository.getProjectByID(id)

  res.status(200).json(response)
}
