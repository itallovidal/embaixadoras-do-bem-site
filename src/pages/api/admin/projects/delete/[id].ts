import type { NextApiRequest, NextApiResponse } from 'next'
import { databaseRepository } from '@/pages/api/_domain/db'
import { idSchema } from '@/pages/api/_schemas/get-project-id-schema'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') return res.status(405).end()

  const { id: collectionID } = req.query

  if (!collectionID) return res.status(404).json('Não passou o id')

  const response = await databaseRepository.deleteProjectById(
    String(collectionID),
  )

  res.status(200).json(response)
}
