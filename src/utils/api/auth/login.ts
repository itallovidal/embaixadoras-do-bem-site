import { api } from '@/lib/axios/axios'
import { TLoginSchema } from '@/types/schemas/login.schema'

export async function login(data: TLoginSchema) {
  console.log('Logando usuário..')

  const response = await api.post('/auth/login', data)

  return response.data.success
}
