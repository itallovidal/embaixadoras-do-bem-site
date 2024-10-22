import { api } from '@/infra/lib/axios/axios'
import { TProjectSchema } from '@/presentation/validation/project.schema'
import nookies from 'nookies'

type IEditProjectProps = Omit<TProjectSchema, 'images'> & {
  imgsToAdd: IImageToAdd[]
  imgsToRemove: IImageToRemove[]
  collectionId: string
  id: string
}

export async function editProject(data: IEditProjectProps) {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('startDate', data.startDate.toString())
  if (data.endDate) formData.append('endDate', data.endDate.toString())
  if (data.isActive) formData.append('isActive', data.isActive.toString())

  data.imgsToRemove.forEach((image) => {
    const { src } = image
    formData.append('imgsToRemove', src)
  })

  data.imgsToAdd.forEach((image) => {
    const { file } = image
    formData.append('imgsToAdd', file)
  })

  const cookies = nookies.get()

  const response = await api.put(
    `/admin/projects/edit/${data.collectionId}/${data.id}`,
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
