import { api } from '@/infra/lib/axios/axios'
import nookies from 'nookies'

interface IDeleteProjectProps {
  collectionId: string
  id: string
}

export async function deleteProject({ id, collectionId }: IDeleteProjectProps) {
  const cookies = nookies.get()

  const response = await api.delete(
    `/admin/projects/delete/${collectionId}/${id}`,
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
