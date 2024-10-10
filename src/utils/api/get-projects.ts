import { api } from '@/lib/axios/axios'
import {IGetProjectRes} from '@/types/responses/get-project-response'

export async function getProjects(
  quantity?: number,
): Promise<IGetProjectRes[]> {
  const response = await api.get(
    `/admin/get-projects?projectQuantity=${quantity}`,
  )

  return response.data
}
