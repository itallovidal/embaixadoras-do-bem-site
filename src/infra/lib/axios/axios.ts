import axios from 'axios'

const host =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://embaixadoras-do-bem-site.vercel.app'

export const api = axios.create({
  baseURL: `${host}/api`,
  validateStatus: () => true,
})
