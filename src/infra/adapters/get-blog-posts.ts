import { api } from '@/infra/lib/axios/axios'

export async function getBlogPosts(postsQuantity?: number): Promise<IPost[]> {
  const response = await api.get(
    `/admin/blog/posts?postsQuantity=${postsQuantity}`,
  )
  return response.data
}
