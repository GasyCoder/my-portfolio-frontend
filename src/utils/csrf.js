import axios from 'axios'

export async function initializeCsrf() {
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    })
    return true
  } catch (error) {
    console.error("Erreur lors de l'initialisation du jeton CSRF:", error)
    return false
  }
}
