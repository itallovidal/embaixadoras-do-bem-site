import { api } from '@/infra/lib/axios/axios'
import nookies from 'nookies'

interface IDeleteCollaborator {
    collectionId: string
    id: string
}

export async function deleteCollaborator({ id, collectionId }: IDeleteCollaborator) {
    const cookies = nookies.get()

    const response = await api.delete(
        `/admin/collaborators/delete/${collectionId}/${id}`,
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
