import axios from 'axios'

export const imageApi = axios.create({ baseURL: 'http://localhost:4000/api' })
