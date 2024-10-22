import { api } from '@/infra/lib/axios/axios'
import { TProjectSchema } from '@/presentation/validation/project.schema'
import nookies from 'nookies'

export async function createProject(data: TProjectSchema) {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('startDate', data.startDate.toString())
  if (data.endDate) formData.append('endDate', data.endDate.toString())
  if (data.isActive) formData.append('isActive', data.isActive.toString())

  data.images.forEach((image) => {
    const { file } = image
    formData.append('images', file)
  })

  const cookies = nookies.get()

  const response = await api.post('/admin/projects/create', formData, {
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
