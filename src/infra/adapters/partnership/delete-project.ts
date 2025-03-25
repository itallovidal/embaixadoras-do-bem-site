import { api } from '@/infra/lib/axios/axios'
import nookies from 'nookies'

interface IDeletePartnershipProps {
  collectionId: string
  id: string
}

export async function deletePartnership({
  id,
  collectionId,
}: IDeletePartnershipProps) {
  const cookies = nookies.get()

  const response = await api.delete(
    `/admin/partnership/delete/${collectionId}/${id}`,
    {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Bearer ' + cookies['@EDB:user-token'],
      },
    },
  )

  if (response.status !== 200) {
    throw Error(`Failed to delete ${collectionId}`)
  }
}
