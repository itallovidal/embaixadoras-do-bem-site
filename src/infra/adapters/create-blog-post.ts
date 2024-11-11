import { api } from '@/infra/lib/axios/axios'
import { TBlogPostSchema } from '@/validation/blogPost.schema'

export async function createBlogPost(data: TBlogPostSchema) {
  await api.post('/admin/blogPosts/post/create', data)
}
