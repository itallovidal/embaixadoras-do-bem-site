import { IGetProjectResponse } from '@/types/responses/get-project-response'
import { api } from '@/lib/axios/axios'

export async function getProjectDetails(
  id: string,
): Promise<IGetProjectResponse> {
  const response = await api.get(`/admin/projects/${id}`)

  return response.data
}
