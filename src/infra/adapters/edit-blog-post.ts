import { api } from '@/infra/lib/axios/axios'
import nookies from 'nookies'
import { TBlogPostSchema } from '@/validation/blogPost.schema'

export interface IEditPostProps {
  post: TBlogPostSchema
  collectionId: string
  id: string
}

export async function editPost(data: IEditPostProps) {
  const cookies = nookies.get()

  const response = await api.put(
    `/admin/blog/posts/edit/${data.collectionId}/${data.id}`,
    data.post,
    {
      headers: {
        Authorization: 'Bearer ' + cookies['@EDB:user-token'],
      },
    },
  )

  if (response.status !== 201) {
    const { error } = response.data as { error: IResponseError }
    throw new Error(error.title, {
      cause: error.description,
    })
  }
}
