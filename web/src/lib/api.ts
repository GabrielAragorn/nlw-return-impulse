import axios from 'axios'

//connecting with backend
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})