import { api } from '@/lib/axios/axios'
import { IGetProjectResponse } from '@/types/responses/get-project-response'
import nookies from 'nookies'

export async function getProjects(
  quantity?: number,
): Promise<IGetProjectResponse[]> {
  const cookies = nookies.get()
  const response = await api.get(
    `/admin/projects?projectQuantity=${quantity}`,
    {
      headers: {
        Authorization: 'Bearer ' + cookies['@EDB:user-token'],
      },
    },
  )

  return response.data
}
