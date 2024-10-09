interface IDatabaseRepository {
  createProject: () => Promise<void>
  editProject: () => Promise<void>
  deleteProject: () => Promise<void>
  getProjectDetails: () => Promise<void>
  getProjectImages: () => Promise<void>
  // createBlogPost: () => Promise<void>
  // editBlogPost: () => Promise<void>
  // deleteBlogPost: () => Promise<void>
  // getBlogPost: () => Promise<void>
}
