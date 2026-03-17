import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

/**
 * Définit le token dans localStorage et dans les headers Axios.
 * À utiliser après connexion.
 */
const setAuthToken = (token) => {
  localStorage.setItem('token', token)
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

/**
 * Supprime le token du localStorage et des headers Axios.
 * À utiliser à la déconnexion.
 */
const removeAuthToken = () => {
  localStorage.removeItem('token')
  delete api.defaults.headers.common.Authorization
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

  // Si un token existe déjà au chargement de l'application,
  // on le remet dans les headers Axios.
  const token = localStorage.getItem('token')
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }
})

// Ajoute automatiquement le token aux requêtes API
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export { api, setAuthToken, removeAuthToken }
