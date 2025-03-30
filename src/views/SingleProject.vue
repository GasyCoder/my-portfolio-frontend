<template>
  <div>
    <Header />
    <section class="mb-12">
      <div class="portfolio-container">
        <div v-if="isLoading" class="py-8 text-center text-gray-400">
          <svg
            class="animate-spin h-8 w-8 mx-auto mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p>Chargement du projet...</p>
        </div>

        <div v-else-if="error" class="py-8 text-center text-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p>{{ error }}</p>
        </div>

        <article v-else-if="project" class="card p-6 backdrop-blur-md rounded-lg">
          <header>
            <h1 class="text-3xl font-bold text-color-text-light mb-4">{{ project.title }}</h1>
            <div class="flex items-center space-x-2 mb-4">
              <span class="tech-badge text-xs" :class="getTechBadgeClass(project.languages?.[0])">
                {{ project.languages?.[0] || 'Unknown' }}
              </span>
              <time :datetime="project.completed_at" class="text-color-text-medium text-xs">
                Terminé le {{ formatDate(project.completed_at) }}
              </time>
            </div>

            <!-- Auteur avec emoji -->
            <div class="flex items-center mb-6">
              <span
                class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 text-2xl mr-3"
                >👨‍💻</span
              >
              <div>
                <span class="block text-sm font-medium text-color-text-light">{{
                  project.owner?.login || 'BEZARA Florent'
                }}</span>
              </div>
            </div>

            <!-- Image principale (screenshot) -->
            <img
              v-if="project.screenshot"
              :src="project.screenshot"
              :alt="project.title"
              class="w-full h-auto rounded-lg mb-6 object-cover"
              loading="lazy"
            />
          </header>

          <!-- Description -->
          <div
            class="prose prose-lg max-w-none text-color-text-medium prose-headings:text-color-text-light prose-strong:text-color-text-light prose-a:text-tailwind-blue prose-a:no-underline hover:prose-a:underline"
          >
            <p>{{ project.description || 'Aucune description disponible.' }}</p>
          </div>

          <!-- Détails supplémentaires -->
          <footer class="mt-8 pt-6 border-t border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div v-if="project.languages?.length">
                <h3 class="text-lg font-medium text-color-text-light mb-2">Langages</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="lang in project.languages"
                    :key="lang"
                    class="tech-badge text-xs px-2 py-1 rounded-md"
                    :class="getTechBadgeClass(lang)"
                  >
                    {{ lang }}
                  </span>
                </div>
              </div>
              <div v-if="project.technologies?.length">
                <h3 class="text-lg font-medium text-color-text-light mb-2">Technologies</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="tech-badge text-xs px-2 py-1 rounded-md"
                    :class="getTechBadgeClass(tech)"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Liens -->
            <div class="flex flex-col md:flex-row gap-4">
              <a
                v-if="project.repo_url"
                :href="project.repo_url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn text-sm inline-flex items-center justify-center rounded-md py-2 px-4 transition-all duration-300 hover:opacity-90 bg-gray-700 hover:bg-gray-600 text-white"
              >
                Voir le dépôt
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-2"
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
              </a>
              <a
                v-if="project.demo_url"
                :href="project.demo_url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn text-sm inline-flex items-center justify-center rounded-md py-2 px-4 transition-all duration-300 hover:opacity-90 bg-blue-700 hover:bg-blue-600 text-white"
              >
                Voir la démo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            <!-- Bouton retour -->
            <router-link
              to="/projects"
              class="text-tailwind-blue mt-6 inline-flex items-center hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour aux projets
            </router-link>
          </footer>
        </article>

        <div v-else class="py-8 text-center text-gray-400">
          <p>Projet non trouvé</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import api from '../api'
import projectsData from '../data/projects.json'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'SingleProject',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      project: null,
      isLoading: true,
      error: null,
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    }
  },
  computed: {
    baseUrl() {
      // Extraire la base URL sans le /api
      return this.apiBaseUrl.replace(/\/api$/, '')
    },
  },
  async created() {
    await this.fetchProjectData()
  },
  async mounted() {
    if (this.project) {
      this.updateMetaTags()
    }
  },
  watch: {
    '$route.params.slug': {
      handler: async function () {
        await this.fetchProjectData()
        if (this.project) {
          this.updateMetaTags()
        }
      },
      immediate: false,
    },
    project: {
      handler: function (newProject) {
        if (newProject) {
          this.updateMetaTags()
        }
      },
      immediate: false,
    },
  },
  methods: {
    async fetchProjectData() {
      try {
        this.isLoading = true
        this.error = null

        const slug = this.$route.params.slug
        const response = await api.get(`/projects/${slug}`)
        this.project = response.data

        // Ajuster l'URL du screenshot si relatif
        if (this.project.screenshot && !this.project.screenshot.startsWith('http')) {
          this.project.screenshot = `${this.baseUrl}${this.project.screenshot}`
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du projet depuis l'API:", error)
        this.error = "Impossible de charger le projet depuis l'API. Affichage des données locales."

        const fallbackProject = projectsData.find((p) => p.slug === this.$route.params.slug)
        if (fallbackProject) {
          this.project = fallbackProject
          if (this.project.screenshot && !this.project.screenshot.startsWith('http')) {
            this.project.screenshot = `/images/${this.project.screenshot}`
          }
        } else {
          this.project = null
          this.error = 'Projet non trouvé, même dans les données locales.'
        }
      } finally {
        this.isLoading = false
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
    getTechBadgeClass(tech) {
      const techMap = {
        Vue: 'vue-badge',
        Laravel: 'laravel-badge',
        JavaScript: 'js-badge',
        PHP: 'php-badge',
        TypeScript: 'ts-badge',
        'Tailwind CSS': 'tailwind-badge',
      }
      return techMap[tech] || 'bg-gray-700/30 text-gray-300 border border-gray-600'
    },
    updateMetaTags() {
      document.title = `${this.project.title} | BEZARA Florent - Développeur Web`
      const description =
        this.project.description?.substring(0, 160) + '...' ||
        'Détails du projet réalisé par BEZARA Florent.'

      this.updateMetaTag('description', description)
      this.updateMetaTag('og:title', this.project.title)
      this.updateMetaTag('og:description', description)
      this.updateMetaTag('og:type', 'article')
      this.updateMetaTag('og:url', window.location.href)
      if (this.project.screenshot) {
        this.updateMetaTag('og:image', this.project.screenshot)
      }
      this.updateMetaTag('twitter:card', 'summary_large_image')
      this.updateMetaTag('twitter:title', this.project.title)
      this.updateMetaTag('twitter:description', description)
      if (this.project.screenshot) {
        this.updateMetaTag('twitter:image', this.project.screenshot)
      }
      this.updateCanonicalLink()
      this.addStructuredData()
    },
    updateMetaTag(name, content) {
      let meta =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    },
    updateCanonicalLink() {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', window.location.href)
    },
    addStructuredData() {
      const existingScript = document.querySelector('script[type="application/ld+json"]')
      if (existingScript) {
        existingScript.remove()
      }
      const projectSchema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: this.project.title,
        description: this.project.description || 'Détails du projet réalisé par BEZARA Florent.',
        image: this.project.screenshot || '',
        author: {
          '@type': 'Person',
          name: this.project.owner?.login || 'BEZARA Florent',
        },
        datePublished: new Date(this.project.completed_at).toISOString(),
        url: window.location.href,
      }
      const script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.textContent = JSON.stringify(projectSchema)
      document.head.appendChild(script)
    },
  },
}
</script>
