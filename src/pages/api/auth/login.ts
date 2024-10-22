import { NextApiRequest, NextApiResponse } from 'next'
import { databaseRepository } from '@/pages/api/_domain/db'
import { loginDTOSchema } from '@/pages/api/_schemas/loginDTO.schema'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'
import { SignJWT } from 'jose'
import { env } from '@/root/env'
import { setCookie } from 'nookies'

const encodedSecret = new TextEncoder().encode(env.JWT_SECRET)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const loginParsed = loginDTOSchema.safeParse(req.body)

  if (!loginParsed.success) {
    const error = new ErrorEntity(
      'Campos incorretos.',
      'Por favor, verifique o campo de senha e o de email novamente.',
      400,
      loginParsed.error,
    )
    return res.status(error.status).json({ error: error.getError() })
  }

  const { email, password } = loginParsed.data

  const userSaved = await databaseRepository.login({ email, password })

  if (!userSaved) {
    const error = new ErrorEntity(
      'Usuário não encontrado',
      'Credenciais inválidas.',
      404,
    )
    return res.status(error.status).json({ error: error.getError() })
  }

  const token = await new SignJWT({
    id: userSaved.id,
    collectionId: userSaved.collectionId,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(encodedSecret)

  setCookie(
    {
      res,
    },
    '@EDB:user-token',
    token,
    {
      maxAge: 60 * 60 * 24 * 30, // 1 month
      path: '/',
    },
  )

  const user = {
    name: userSaved.name,
    email: userSaved.email,
  }

  setCookie(
    {
      res,
    },
    '@EDB:user',
    JSON.stringify(user),
    {
      maxAge: 60 * 60 * 24 * 30, // 1 month
      path: '/',
    },
  )

  res.status(200).json({
    user,
  })
}
