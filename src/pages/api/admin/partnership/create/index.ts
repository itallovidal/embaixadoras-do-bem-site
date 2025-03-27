import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'
import formidable from 'formidable'
import { databaseRepository } from '@/pages/api/_domain/db'
import { partnershipSchema } from '@/validation/partnership.schema'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const userStringfied = req.headers.user
  if (!userStringfied) return res.status(401).end()

  const form = formidable({})

  form.parse(req, async (err, fields, files) => {
    if (err) {
      const error = new ErrorEntity(
        'Erro interno de servidor.',
        'Algo deu errado em sua requisição, tente novamente mais tarde.',
        500,
      )
      return res.status(500).json({ error: error.getError() })
    }

    const fieldsObj = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, ...value]
        }
        return [key, value]
      }),
    )

    const partnershipParsed = partnershipSchema.safeParse(fieldsObj)
    if (!partnershipParsed.success) {
      const error = new ErrorEntity(
        'Informações erradas.',
        'Dados necessários incorretos.',
        400,
        partnershipParsed.error,
      )

      return res.status(error.status).json({ error: error.getError() })
    }

    const partnership = partnershipParsed.data
    const { image } = files

    await databaseRepository.createPartnership(partnership.name, image)

    return res.status(201).json({ message: 'Project Created' })
  })
}
