import { api } from '@/infra/lib/axios/axios'
import { IGetProjectResponse } from '@/domain/api-responses/projects/get-project-response'

export async function getProjects(
  quantity?: number,
): Promise<IGetProjectResponse[]> {
  const response = await api.get(`/admin/projects?projectQuantity=${quantity}`)
  return response.data
}
