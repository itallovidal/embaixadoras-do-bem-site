import { NextApiRequest, NextApiResponse } from 'next'
import { databaseRepository } from '@/pages/api/_domain/db'
import { loginDTOSchema } from '@/pages/api/_schemas/loginDTO.schema'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'
import { sign } from 'jsonwebtoken'
import { env } from '@/root/env'
import { setCookie } from 'nookies'

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

  console.log(userSaved)
  console.log(!userSaved)

  if (!userSaved) {
    const error = new ErrorEntity(
      'Usuário não encontrado',
      'Credenciais inválidas.',
      404,
    )
    return res.status(error.status).json({ error: error.getError() })
  }

  const token = sign(
    { id: userSaved.id, collectionId: userSaved.collectionId },
    env.JWT_SECRET,
  )

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

  res.status(201).json({
    user,
  })
}
