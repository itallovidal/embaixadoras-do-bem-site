import { api } from '@/infra/lib/axios/axios'

export async function getBlogTags(): Promise<IBlogPostsTag[]> {
  const response = await api.get('/admin/blogPosts/tags')
  return response.data
}
