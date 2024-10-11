import { api } from '@/lib/axios/axios'
import { IGetProjectResponse } from '@/types/responses/get-project-response'

export async function getProjects(
  quantity?: number,
): Promise<IGetProjectResponse[]> {
  const response = await api.get(`/admin/projects?projectQuantity=${quantity}`)

  return response.data
}
