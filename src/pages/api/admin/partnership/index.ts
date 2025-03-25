import type { NextApiRequest, NextApiResponse } from 'next'
import { databaseRepository } from '@/pages/api/_domain/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const { projectQuantity } = req.query

  const response = await databaseRepository.getPartnership(
    Number(projectQuantity),
  )

  res.status(200).json(response)
}
