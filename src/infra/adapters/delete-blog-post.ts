import { api } from '@/infra/lib/axios/axios'
import nookies from 'nookies'

export async function deleteBlogPost(collectionId: string) {
  const cookies = nookies.get()

  const response = await api.delete(
    `/admin/blog/posts/delete/${collectionId}`,
    {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Bearer ' + cookies['@EDB:user-token'],
      },
    },
  )

  if (response.status !== 200) {
    throw Error(`Failed to delete ${collectionId}`)
  }
}
