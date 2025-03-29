import axios from 'axios'

const csrfService = {
  getCsrfCookie: async function () {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      })
      console.log('Cookie CSRF récupéré avec succès')
      return true
    } catch (error) {
      console.error('Erreur lors de la récupération du cookie CSRF:', error)
      return false
    }
  },
}

export default csrfService
