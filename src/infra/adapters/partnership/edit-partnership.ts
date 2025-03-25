import { api } from '@/infra/lib/axios/axios'
import nookies from 'nookies'
import { TPartnershipSchema } from '@/validation/partnership.schema'

type IEditProjectProps = TPartnershipSchema & {
  collectionId: string
  id: string
}

export async function editPartnership(data: IEditProjectProps) {
  const formData = new FormData()
  formData.append('name', data.name)
  if (data.image !== '') formData.append('image', data.image[0].file)

  const cookies = nookies.get()

  const response = await api.put(
    `/admin/partnership/edit/${data.collectionId}/${data.id}`,
    formData,
    {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Bearer ' + cookies['@EDB:user-token'],
      },
    },
  )

  if (response.status !== 201) {
    const { error } = response.data as { error: IResponseError }
    throw new Error(error.title, {
      cause: error.description,
    })
  }
}
