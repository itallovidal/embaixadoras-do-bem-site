interface IResponseError {
  title: string
  description: string
  status: number
  details?: {
    code: number
    message: string
  }
}
