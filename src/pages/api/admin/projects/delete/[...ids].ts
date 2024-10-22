import type { NextApiRequest, NextApiResponse } from 'next'
import { databaseRepository } from '@/pages/api/_domain/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') return res.status(405).end()

  const { ids } = req.query

  if (!Array.isArray(ids)) return res.status(404).json('Não passou os ids')

  const [collectionID, id] = ids

  if (!collectionID || !id) return res.status(404).json('Não passou os ids')

  const response = await databaseRepository.deleteProjectById(
    String(collectionID),
    String(id),
  )

  res.status(200).json(response)
}
