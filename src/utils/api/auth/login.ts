import { api } from '@/lib/axios/axios'
import { TLoginSchema } from '@/types/schemas/login.schema'

export async function login(data: TLoginSchema): Promise<ILoginResponse> {
  const response = await api.post('/auth/login', data)

  if (response.status === 201) {
    return response.data
  }

  if (response.status === 500) {
    throw {
      message: 'ops! Não foi possível fazer o login.',
      cause: 'Tente novamente mais tarde.',
    }
  }

  throw {
    message: response.data.error.details.message,
    cause: response.data.error.description,
  }
}
