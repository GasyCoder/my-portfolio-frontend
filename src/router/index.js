import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'BEZARA Florent | Développeur Web Laravel & Vue.js',
      metaTags: [
        {
          name: 'description',
          content: 'Développeur Web spécialisé en Laravel, Vue.js et Tailwind CSS à Madagascar.',
        },
        {
          property: 'og:description',
          content: 'Développeur Web spécialisé en Laravel, Vue.js et Tailwind CSS à Madagascar.',
        },
      ],
    },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: {
      title: 'Projets | BEZARA Florent - Développeur Web',
      metaTags: [
        {
          name: 'description',
          content:
            'Découvrez mes projets de développement web réalisés avec Laravel, Vue.js et Tailwind CSS.',
        },
      ],
    },
  },
  {
    path: '/projects/:slug',
    name: 'ProjectDetail',
    component: () => import('../views/SigleProject.vue'),
    meta: {
      title: 'Projet | BEZARA Florent - Développeur Web',
      metaTags: [
        {
          name: 'description',
          content:
            'Découvrez mes projets de développement web réalisés avec Laravel, Vue.js et Tailwind CSS.',
        },
      ],
    },
  },
  {
    path: '/work',
    name: 'Work',
    component: () => import('../views/WorkView.vue'),
    meta: {
      title: 'Expériences | BEZARA Florent - Développeur Web',
      metaTags: [
        {
          name: 'description',
          content: 'Mon parcours professionnel et mes expériences en tant que développeur web.',
        },
      ],
    },
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('../views/ArticlesView.vue'),
    meta: {
      title: 'Articles | BEZARA Florent - Développeur Web',
      metaTags: [
        {
          name: 'description',
          content:
            'Articles et tutoriels sur le développement web, Laravel, Vue.js et Tailwind CSS.',
        },
      ],
    },
  },
  {
    path: '/articles/:slug',
    name: 'ArticleDetail',
    component: () => import('../views/SigleArticle.vue'),
    meta: {
      title: 'Article | BEZARA Florent - Développeur Web',
      // Titre et description dynamiques gérés dans le composant
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'Contact | BEZARA Florent - Développeur Web',
      metaTags: [
        {
          name: 'description',
          content:
            'Contactez-moi pour discuter de vos projets de développement web ou pour toute collaboration.',
        },
      ],
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Scroll to top on page navigation
  scrollBehavior() {
    return { top: 0 }
  },
})

// Mise à jour des métadonnées à chaque changement de route
router.beforeEach((to, from, next) => {
  // Mise à jour du titre
  document.title = to.meta.title || 'BEZARA Florent | Développeur Web'

  // Supprimer les meta tags existants
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) => el.remove())

  // Ajouter les nouveaux meta tags
  if (to.meta.metaTags) {
    to.meta.metaTags.forEach((tagDef) => {
      const tag = document.createElement('meta')
      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key])
      })
      tag.setAttribute('data-vue-router-controlled', '')
      document.head.appendChild(tag)
    })
  }

  next()
})

export default router
