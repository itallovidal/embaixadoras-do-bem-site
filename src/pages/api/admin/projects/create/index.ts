import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'
import formidable from 'formidable'
import { projectDTOSchema } from '@/pages/api/_schemas/project-d-t-o.schema'
import { databaseRepository } from '@/pages/api/_domain/db'

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

  const user = JSON.parse(String(userStringfied))
  console.log(user)

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

    if (!files.images) {
      const error = new ErrorEntity(
        'Nenhuma imagem enviada.',
        'Para criação de um projeto, deve-se ter pelo menos uma imagem.',
        400,
      )

      return res.status(400).json({ error: error.getError() })
    }

    const fieldsObj = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, ...value]
        }
        return [key, value]
      }),
    )

    const projectParsed = projectDTOSchema.safeParse(fieldsObj)
    if (!projectParsed.success) {
      const error = new ErrorEntity(
        'Informações erradas.',
        'Dados necessários incorretos.',
        400,
        projectParsed.error,
      )

      return res.status(error.status).json({ error: error.getError() })
    }

    const project = projectParsed.data
    const { images } = files

    await databaseRepository.createProject(project, images)

    return res.status(201).json({ message: 'Project Created' })
  })
}
