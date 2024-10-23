import axios from 'axios'
import { env } from '@/root/env'

const host = env.HOST_URL

export const api = axios.create({
  baseURL: `${host}/api`,
  validateStatus: () => true,
})
