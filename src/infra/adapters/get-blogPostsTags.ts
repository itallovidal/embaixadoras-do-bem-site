import { api } from '@/infra/lib/axios/axios'
import { IGetProjectResponse } from '@/domain/api-responses/projects/get-project-response'

export async function getBlogPostsTags(): Promise<IBlogPostsTag[]> {
  const response = await api.get('/admin/blogPosts/tags')
  return response.data
}
