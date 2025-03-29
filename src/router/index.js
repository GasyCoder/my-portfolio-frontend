import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsView.vue'),
  },
  {
    path: '/work',
    name: 'Work',
    component: () => import('../views/WorkView.vue'),
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('../views/ArticlesView.vue'),
  },
  {
    path: '/articles/:slug',
    name: 'ArticleDetail',
    component: () => import('../views/ArticleDetailView.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
