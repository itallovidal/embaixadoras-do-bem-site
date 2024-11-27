import { api } from '@/infra/lib/axios/axios'
import { TLoginSchema } from '@/validation/login.schema'

export async function login(data: TLoginSchema): Promise<ILoginResponse> {
  const response = await api.post('/auth/login', data)

  if (response.status === 200) {
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
