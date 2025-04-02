import axios from 'axios'

// Création de l'instance axios avec la configuration de base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  withCredentials: true, // Essentiel pour les cookies CSRF
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Important pour Laravel
  },
})

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)

    // Si c'est une erreur d'authentification, on peut rediriger ou afficher un message
    if (error.response && error.response.status === 403) {
      console.warn('Permission denied. Please check your credentials.')
    }

    return Promise.reject(error)
  },
)

export default api
