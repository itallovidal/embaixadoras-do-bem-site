import type { NextApiRequest, NextApiResponse } from 'next'
import { databaseRepository } from '@/pages/api/_domain/db'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const { id } = req.query

  if (!id) {
    const error = new ErrorEntity(
      'ID inválido.',
      'Não foi informado um ID.',
      400,
    )
    return res.status(error.status).json({ error: error.getError() })
  }

  const response = await databaseRepository.getBlogPostsTagById(String(id))

  res.status(200).json(response)
}
