import type { NextApiRequest, NextApiResponse } from 'next'
// import { databaseRepository } from '@/pages/api/_domain/db'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'
import formidable from 'formidable'
import { projectDTOSchema } from '@/pages/api/_schemas/project-d-t-o.schema'
import { databaseRepository } from '@/pages/api/_domain/db'
import {partnershipSchema} from "@/validation/partnership.schema";

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

    await databaseRepository.editPartnership({
      collectionId,
      id,
      partnership,
    })

    return res.status(201).json({ message: 'Partnership Created' })
  })
}
