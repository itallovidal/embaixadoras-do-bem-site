import axios from 'axios'

const host = 'http://localhost:3000'

export const api = axios.create({
  baseURL: `${host}/api`,
  validateStatus: () => true,
})
