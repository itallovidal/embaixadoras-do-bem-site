import { IGetCollaboratorResponse } from '@/domain/api-responses/get-collaborator-response'
import { api } from '@/infra/lib/axios/axios'

export async function getCollaborators(
  quantity?: number,
): Promise<IGetCollaboratorResponse[]> {
  const response = await api.get(`/admin/collaborators?quantity=${quantity}`)
  return response.data
}
