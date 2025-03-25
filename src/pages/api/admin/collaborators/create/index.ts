import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'
import formidable from 'formidable'
import { projectDTOSchema } from '@/pages/api/_schemas/project-d-t-o.schema'
import { databaseRepository } from '@/pages/api/_domain/db'
import { collaboratorDTOSchema } from '@/pages/api/_schemas/collaborator-DTO.schema'

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
    console.log(userStringfied)
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

        if (!files.images) {
            const error = new ErrorEntity(
                'Nenhuma imagem enviada.',
                'Para criação de um colaborador, deve-se ter pelo menos uma imagem.',
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

        const collaboratorParsed = collaboratorDTOSchema.safeParse(fieldsObj)
        if (!collaboratorParsed.success) {
            const error = new ErrorEntity(
                'Informações erradas.',
                'Dados necessários incorretos.',
                400,
                collaboratorParsed.error,
            )

            return res.status(error.status).json({ error: error.getError() })
        }

        const collaborator = collaboratorParsed.data
        const { images } = files

        await databaseRepository.createCollaborator(collaborator, images)

        return res.status(201).json({ message: 'Collaborator Created' })
    })
}
