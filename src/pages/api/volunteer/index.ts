import { MailtrapSender } from '@/infra/lib/mailtrap'
import { NextApiRequest, NextApiResponse } from 'next'
import { volunteerSchema } from '@/validation/volunteer.schema'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'

const sender = new MailtrapSender()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const requestParsed = volunteerSchema.safeParse(req.body)

  if (!requestParsed.success) {
    const error = new ErrorEntity(
      'Campos incorretos.',
      'Por favor, verifique os campos e tente novamente.',
      400,
      requestParsed.error,
    )
    return res.status(error.status).json({ error: error.getError() })
  }

  const volunteer = requestParsed.data
  try {
    await sender.sendEmail(volunteer)
    return res.status(200).end()
  } catch (e) {
    return res.status(500).end()
  }
}
