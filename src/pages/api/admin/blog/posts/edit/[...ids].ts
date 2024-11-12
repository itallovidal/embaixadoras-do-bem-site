import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'
import { databaseRepository } from '@/pages/api/_domain/db'
import { blogPostDTOSchema } from '@/pages/api/_schemas/blogPostDTOSchema.schema'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') return res.status(405).end()
  const { ids } = req.query as { ids: string[] }

  const [collectionId, id] = ids

  if (!collectionId || !id) return res.status(404).json('Não passou o id')

  const data = req.body

  const projectParsed = blogPostDTOSchema.safeParse(data)

  if (!projectParsed.success) {
    const error = new ErrorEntity(
      'Informações erradas.',
      'Dados necessários incorretos.',
      400,
      projectParsed.error,
    )

    return res.status(error.status).json({ error: error.getError() })
  }

  const post = projectParsed.data

  await databaseRepository.editPost({
    collectionId,
    post,
  })

  return res.status(201).json({ message: 'Post Created' })
}
