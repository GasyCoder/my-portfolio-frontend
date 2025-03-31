<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <!-- En-tête avec titre et filtre -->
      <div class="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
        <h3 class="section-title">Projects</h3>

        <!-- Filtres par language -->
        <div class="flex flex-wrap gap-2">
          <button
            @click="filterProjects('all')"
            class="px-3 py-1 text-xs transition-colors rounded-full tech-filter-btn"
            :class="
              currentFilter === 'all'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            "
          >
            All
          </button>
          <button
            v-for="lang in availableLanguages"
            :key="lang"
            @click="filterProjects(lang)"
            class="px-3 py-1 text-xs transition-colors rounded-full tech-filter-btn"
            :class="
              currentFilter === lang
                ? getTechBadgeClass(lang)
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            "
          >
            {{ lang }}
          </button>
        </div>
      </div>

      <AppLoader v-if="isLoading" message="Loading projects..." />
      <AppError v-else-if="error" :message="error" />

      <div v-else>
        <!-- Message si aucun projet ne correspond au filtre -->
        <div v-if="specificProjects.length === 0" class="py-8 text-center text-gray-400">
          <h4 class="mb-2 text-xl font-semibold">No projects found</h4>
          <p>No projects match the current filter criteria.</p>
          <button
            @click="filterProjects('all')"
            class="px-4 py-2 mt-4 text-white transition-colors bg-gray-700 rounded-md hover:bg-gray-600"
          >
            View all projects
          </button>
        </div>

        <!-- Liste des projets -->
        <div v-else class="space-y-4">
          <!-- Projet individuel -->
          <div
            v-for="(project, index) in specificProjects"
            :key="project.id"
            class="overflow-hidden transition-all duration-300 border rounded-lg project-item bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/70"
            :class="{ 'featured-project': project.featured }"
          >
            <div class="flex flex-col md:flex-row">
              <!-- Image du projet (visible seulement sur mobile) -->
              <div class="relative w-full h-40 bg-gray-800 md:hidden">
                <img
                  v-if="project.screenshot"
                  :src="project.screenshot"
                  :alt="project.title"
                  class="object-cover w-full h-full"
                  loading="lazy"
                />
                <div
                  v-else
                  class="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-10 h-10 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <!-- Image du projet (desktop) -->
              <div class="relative hidden w-40 h-auto bg-gray-800 md:block">
                <img
                  v-if="project.screenshot"
                  :src="project.screenshot"
                  :alt="project.title"
                  class="object-cover w-full h-full"
                  loading="lazy"
                />
                <div
                  v-else
                  class="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-10 h-10 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <!-- Badge featured -->
                <div
                  v-if="project.featured"
                  class="absolute px-2 py-1 text-xs font-semibold text-yellow-100 rounded top-2 left-2 bg-yellow-600/90"
                >
                  Featured
                </div>
              </div>

              <!-- Contenu du projet -->
              <div class="flex flex-col justify-between flex-1 p-4">
                <div>
                  <!-- En-tête avec titre et badge -->
                  <div class="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 class="text-lg font-semibold text-color-text-light">
                        {{ project.title }}
                        <span
                          v-if="project.featured && project.featured === true"
                          class="md:hidden inline-flex items-center ml-2 bg-yellow-600/90 text-yellow-100 text-xs font-semibold px-2 py-0.5 rounded"
                        >
                          Featured
                        </span>
                      </h4>
                      <div class="mt-1 text-xs text-gray-400">
                        <span>{{
                          formatDate(project.completed_at || project.created_at || '2024-01-01')
                        }}</span>
                        <span
                          v-if="project.completed_at"
                          class="ml-2 bg-green-800/50 text-green-200 text-xs px-2 py-0.5 rounded"
                          >Completed</span
                        >
                        <span
                          v-else
                          class="ml-2 bg-blue-800/50 text-blue-200 text-xs px-2 py-0.5 rounded"
                          >In Progress</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Description -->
                  <p class="mb-3 text-sm text-color-text-medium line-clamp-2">
                    {{ project.description || 'No description available' }}
                  </p>
                </div>

                <div>
                  <!-- Langages et technologies -->
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span
                      v-for="lang in project.languages"
                      :key="`lang-${lang}`"
                      class="tech-badge text-xs px-2 py-0.5 rounded-full flex items-center"
                      :class="getTechBadgeClass(lang)"
                    >
                      {{ lang }}
                    </span>
                    <span
                      v-for="tech in project.technologies"
                      :key="`tech-${tech}`"
                      class="tech-badge text-xs px-2 py-0.5 rounded-full flex items-center bg-gray-800/50 text-gray-300 border border-gray-600/50"
                    >
                      {{ tech }}
                    </span>
                  </div>

                  <!-- Actions -->
                  <div class="flex flex-wrap items-center gap-3 mt-2">
                    <router-link
                      :to="`/projects/${project.slug}`"
                      class="btn-action text-sm inline-flex items-center px-3 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Details
                    </router-link>

                    <a
                      v-if="project.repo_url"
                      :href="project.repo_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-action text-sm inline-flex items-center px-3 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      Code
                    </a>

                    <a
                      v-if="project.demo_url"
                      :href="project.demo_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-action text-sm inline-flex items-center px-3 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../api'
import projectsData from '../data/projects.json'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppError from '@/components/ui/AppError.vue'

export default {
  name: 'ProjectSection',
  components: {
    AppLoader,
    AppError,
  },
  data() {
    return {
      allProjects: [],
      specificProjects: [],
      isLoading: true,
      error: null,
      currentFilter: 'all',
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    }
  },
  computed: {
    availableLanguages() {
      // Extraire tous les langages uniques des projets
      const allLanguages = new Set()
      this.allProjects.forEach((project) => {
        if (Array.isArray(project.languages)) {
          project.languages.forEach((lang) => {
            allLanguages.add(lang)
          })
        }
      })
      return Array.from(allLanguages).sort()
    },
  },
  async created() {
    await this.fetchProjects()
  },
  methods: {
    async fetchProjects() {
      try {
        this.isLoading = true
        this.error = null

        const response = await api.get('/projects')
        this.allProjects = response.data
        this.specificProjects = this.allProjects

        // Normaliser les URLs des images
        // Extraire la base URL sans le /api
        const baseUrl = this.apiBaseUrl.replace(/\/api$/, '')

        this.specificProjects = this.specificProjects.map((project) => {
          if (project.screenshot && !project.screenshot.startsWith('http')) {
            project.screenshot = `${baseUrl}${project.screenshot}`
          }
          return project
        })
      } catch (error) {
        console.error("Erreur lors de la récupération des projets depuis l'API:", error)
        this.error =
          "Impossible de charger les projets depuis l'API. Affichage des données locales."
        this.allProjects = projectsData
        this.specificProjects = this.allProjects

        // Garder l'URL des images en relatif en mode fallback pour plus de flexibilité
        this.specificProjects = this.specificProjects.map((project) => {
          if (
            project.screenshot &&
            !project.screenshot.startsWith('http') &&
            !project.screenshot.startsWith('/')
          ) {
            project.screenshot = `/images/${project.screenshot}`
          }
          return project
        })
      } finally {
        this.isLoading = false
      }
    },

    // Formater une date
    formatDate(dateString) {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date)
    },

    // Filtrer les projets par langage
    filterProjects(filter) {
      this.currentFilter = filter

      if (filter === 'all') {
        this.specificProjects = this.allProjects
        return
      }

      this.specificProjects = this.allProjects.filter((project) => {
        return Array.isArray(project.languages) && project.languages.includes(filter)
      })
    },

    getTechBadgeClass(tech) {
      const techMap = {
        Laravel: 'bg-red-700/20 text-red-300 border border-red-600/30',
        Vue: 'bg-green-700/20 text-green-300 border border-green-600/30',
        JavaScript: 'bg-yellow-700/20 text-yellow-300 border border-yellow-600/30',
        PHP: 'bg-purple-700/20 text-purple-300 border border-purple-600/30',
        TypeScript: 'bg-blue-700/20 text-blue-300 border border-blue-600/30',
        Python: 'bg-blue-800/20 text-blue-300 border border-blue-600/30',
        'Tailwind CSS': 'bg-teal-700/20 text-teal-300 border border-teal-600/30',
        TailwindCSS: 'bg-teal-700/20 text-teal-300 border border-teal-600/30',
        HTML: 'bg-orange-700/20 text-orange-300 border border-orange-600/30',
        CSS: 'bg-blue-600/20 text-blue-300 border border-blue-500/30',
        Java: 'bg-orange-800/20 text-orange-300 border border-orange-600/30',
        'C#': 'bg-green-800/20 text-green-300 border border-green-700/30',
        Go: 'bg-cyan-800/20 text-cyan-300 border border-cyan-700/30',
        Ruby: 'bg-red-800/20 text-red-300 border border-red-700/30',
        Rust: 'bg-orange-900/20 text-orange-300 border border-orange-700/30',
        Swift: 'bg-orange-700/20 text-orange-300 border border-orange-600/30',
        Kotlin: 'bg-purple-800/20 text-purple-300 border border-purple-700/30',
      }

      return techMap[tech] || 'bg-gray-700/30 text-gray-300 border border-gray-600/50'
    },
  },
}
</script>
