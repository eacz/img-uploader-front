import axios from 'axios'

export const imageApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL })
