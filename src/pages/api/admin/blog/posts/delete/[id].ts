import type { NextApiRequest, NextApiResponse } from 'next'
import { databaseRepository } from '@/pages/api/_domain/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') return res.status(405).end()

  const { id: collectionId } = req.query as { id: string }

  if (!collectionId) return res.status(404).json('Não passou o id')

  await databaseRepository.deleteBlogPostById(collectionId)

  return res.status(200).json({ message: 'Post Created' })
}
