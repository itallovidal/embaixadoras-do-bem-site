import { api } from '@/lib/axios/axios'
import { TLoginSchema } from '@/types/schemas/login.schema'

export async function login(data: TLoginSchema): Promise<ILoginResponse> {
  const response = await api.post('/auth/login', data)

  return response.data
}
