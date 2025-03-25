import { api } from '@/infra/lib/axios/axios'
import { IGetPartnershipResponse } from '@/domain/api-responses/partnership/get-partnership-response'

export async function getPartnerships(
  quantity?: number,
): Promise<IGetPartnershipResponse[]> {
  const response = await api.get(
    `/admin/partnership?projectQuantity=${quantity}`,
  )
  return response.data
}
