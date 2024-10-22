import { NextRequest, NextResponse } from 'next/server'
import { ErrorEntity } from '@/pages/api/_domain/error-entity'
import { env } from '@/root/env'
import { jwtVerify } from 'jose'

const encodedSecret = new TextEncoder().encode(env.JWT_SECRET)

export async function middleware(req: NextRequest) {
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  if (!req.headers.has('Authorization')) {
    const error = new ErrorEntity(
      'Usuário não autorizado.',
      'Token não fornecido.',
      401,
    )
    return NextResponse.json(
      { error: error.getError() },
      {
        status: error.status,
      },
    )
  }

  const bearerToken = String(req.headers.get('Authorization'))
  console.log('bearerToken', bearerToken)

  const token = bearerToken.split(' ')[1]
  try {
    const { payload: user } = await jwtVerify(token, encodedSecret)
    const headers = new Headers(req.headers)
    headers.set('user', JSON.stringify(user))
    return NextResponse.next({ headers })
  } catch (e) {
    console.log(e)
    const error = new ErrorEntity(
      'Token Inválido.',
      'Token fornecido não é valido, envie um corretamente.',
      401,
    )
    return NextResponse.json(
      { error: error.getError() },
      {
        status: error.status,
      },
    )
  }
}

export const config = {
  matcher: [
    '/api/admin/projects/create/:path*',
    '/api/admin/projects/delete/:path*',
    '/api/admin/projects/edit/:path/:path*',
  ],
}
