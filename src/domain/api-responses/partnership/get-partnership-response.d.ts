import { ITime } from '@/domain/api-responses/projects/get-project-response'
import { TPartnershipSchema } from '@/validation/partnership.schema'

type IGetPartnershipResponse = TPartnershipSchema & {
  createdAt: ITime
  updatedAt: ITime
  endDate: ITime
  startDate: ITime
  id: string
  collectionId: string
}
