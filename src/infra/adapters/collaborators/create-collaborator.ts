import { api } from '@/infra/lib/axios/axios'
import { TCollaboratorSchema } from '@/validation/create-collaborator.schema'
import nookies from 'nookies'

export async function createCollaborator(data: TCollaboratorSchema) {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('responsability', data.responsability)

  data.images.forEach((image) => {
    const { file } = image
    formData.append('images', file)
  })

  const cookies = nookies.get()

  const response = await api.post('/admin/collaborators/create', formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
      Authorization: 'Bearer ' + cookies['@EDB:user-token'],
    },
  })

  if (response.status !== 201) {
    const { error } = response.data as { error: IResponseError }
    throw new Error(error.title, {
      cause: error.description,
    })
  }
}
