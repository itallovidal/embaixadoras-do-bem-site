import { IGetProjectResponse } from '@/types/responses/get-project-response'
import { api } from '@/lib/axios/axios'
import nookies from 'nookies'

export async function getProjectDetails(
  id: string,
): Promise<IGetProjectResponse> {
  const cookies = nookies.get()

  console.log('aaa')
  console.log(cookies)

  const response = await api.get(`/admin/projects/${id}`, {
    headers: {
      Authorization: 'Bearer ' + cookies['@EDB:user-token'],
    },
  })

  return response.data
}
