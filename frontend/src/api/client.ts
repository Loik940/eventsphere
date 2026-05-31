/**
 * Client HTTP du frontend.
 * Ce fichier configurera Axios avec l'URL de l'API et l'ajout automatique du token JWT si l'utilisateur est connecte.
 */
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('eventsphere_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default apiClient
