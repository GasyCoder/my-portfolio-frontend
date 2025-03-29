import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import csrfService from './services/csrf' // Importez le service CSRF

// Récupérer un cookie CSRF au démarrage, puis initialiser l'application
csrfService.getCsrfCookie().then(() => {
  const app = createApp(App)

  app.config.devtools = false

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
})
