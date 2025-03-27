import { api } from '@/infra/lib/axios/axios'
import { TCollaboratorSchema } from '@/validation/create-collaborator.schema'
import nookies from 'nookies'

type IEditCollabProps = Omit<TCollaboratorSchema, 'images'> & {
  imgsToAdd: IImageToAdd[]
  imgsToRemove: IImageToRemove[]
  collectionId: string
  id: string
}

export async function editCollaborator(data: IEditCollabProps) {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('responsability', data.responsability)

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
    `/admin/collaborators/edit/${data.collectionId}/${data.id}`,
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
