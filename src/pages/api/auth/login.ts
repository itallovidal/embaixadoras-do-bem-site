import { NextApiRequest, NextApiResponse } from 'next'
import { databaseRepository } from '@/pages/api/_domain/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  const response = await databaseRepository.login({ email, password })

  res.status(200).json({ success: response })
}
