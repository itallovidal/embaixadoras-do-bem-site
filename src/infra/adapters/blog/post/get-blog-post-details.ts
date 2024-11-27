import { api } from '@/infra/lib/axios/axios'
import nookies from 'nookies'

export async function getBlogtDetails(id: string): Promise<IPost> {
  const cookies = nookies.get()

  const response = await api.get(`/admin/blog/posts/${id}`, {
    headers: {
      Authorization: 'Bearer ' + cookies['@EDB:user-token'],
    },
  })

  return response.data
}
