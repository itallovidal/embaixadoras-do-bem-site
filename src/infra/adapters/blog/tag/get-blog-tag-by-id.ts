import { api } from '@/infra/lib/axios/axios'

export async function getBlogTagById({
  id,
}: {
  id: string
}): Promise<IBlogPostsTag> {
  const response = await api.get(`/admin/blog/tags/${id}`)
  return response.data
}
