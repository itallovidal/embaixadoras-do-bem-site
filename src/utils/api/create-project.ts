import { api } from '@/lib/axios/axios'
import { TCreateProjectSchema } from '@/types/schemas/create-project.schema'

export async function createProject(data: TCreateProjectSchema) {
  console.log('Criando projeto..')
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

  const response = await api.post('/admin/create-project', formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  })

  if (response.status !== 201) {
    const { error } = response.data as { error: IResponseError }
    throw new Error(error.title, {
      cause: error.description,
    })
  }
}
