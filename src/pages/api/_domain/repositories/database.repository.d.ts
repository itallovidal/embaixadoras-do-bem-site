import { ICreateProjectDTO } from '@/pages/api/_types/create-project-dto.type'
import formidable from 'formidable'

interface IDatabaseRepository {
  createProject: (
    project: ICreateProjectDTO,
    images: formidable.File[],
  ) => Promise<void>
  editProject: () => Promise<void>
  deleteProject: () => Promise<void>
  getProjectDetails: () => Promise<void>
  getProjectImages: () => Promise<void>
  getProjects: (queryLimit?: number) => Promise<void>
  // createBlogPost: () => Promise<void>
  // editBlogPost: () => Promise<void>
  // deleteBlogPost: () => Promise<void>
  // getBlogPost: () => Promise<void>
}
