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
          <p>Loading work details...</p>
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

        <article v-else-if="work" class="card p-6 backdrop-blur-md rounded-lg">
          <header>
            <h1 class="text-3xl font-bold text-color-text-light mb-4">{{ work.title }}</h1>
            <div class="flex items-center space-x-2 mb-4">
              <span
                v-if="work.client_name"
                class="tech-badge text-xs bg-blue-500/20 text-blue-300 border border-blue-600/30"
              >
                Client: {{ work.client_name }}
              </span>
              <span
                class="tech-badge text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-600/30"
              >
                Year: {{ work.year }}
              </span>
            </div>

            <!-- Technologies -->
            <div v-if="getWorkTechnologies(work).length > 0" class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="(tech, index) in getWorkTechnologies(work)"
                :key="index"
                class="tech-badge text-xs bg-gray-700/30 text-gray-300 border border-gray-600"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Lien du projet -->
            <div v-if="work.url" class="mb-6">
              <a
                :href="work.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-tailwind-blue hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
                Visit Project
              </a>
            </div>

            <!-- Image principale -->
            <img
              v-if="work.image"
              :src="work.image"
              :alt="work.title"
              class="w-full h-auto rounded-lg mb-6 object-cover"
              loading="lazy"
            />
          </header>

          <!-- Description -->
          <div class="mb-8 bg-gray-800/30 p-6 rounded-lg">
            <h2 class="text-xl font-bold text-color-text-light mb-4">Project Overview</h2>
            <p class="text-color-text-medium leading-relaxed">{{ work.description }}</p>
          </div>

          <!-- Contenu détaillé -->
          <div
            class="prose prose-lg max-w-none text-color-text-medium prose-headings:text-color-text-light prose-strong:text-color-text-light prose-a:text-tailwind-blue prose-a:no-underline hover:prose-a:underline"
            v-html="work.content"
          ></div>

          <footer class="mt-8 pt-6 border-t border-gray-700">
            <!-- Travaux connexes -->
            <div v-if="relatedWorks.length > 0" class="mt-6">
              <h3 class="text-lg font-medium text-color-text-light mb-6">Related Projects</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  v-for="relatedWork in relatedWorks"
                  :key="relatedWork.id"
                  class="bg-gray-800/30 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800/50 transition-colors"
                  @click="navigateToWork(relatedWork.slug)"
                >
                  <div class="h-32 bg-gray-700/30 overflow-hidden">
                    <img
                      v-if="relatedWork.image"
                      :src="relatedWork.image"
                      :alt="relatedWork.title"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <svg
                        class="w-10 h-10 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="p-4">
                    <h4 class="font-bold text-color-text-light mb-1">{{ relatedWork.title }}</h4>
                    <p class="text-sm text-color-text-medium line-clamp-2">
                      {{ relatedWork.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <router-link
              to="/work"
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
              Back to works
            </router-link>
          </footer>
        </article>

        <div v-else class="py-8 text-center text-gray-400">
          <p>Work not found</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import api from '../api' // Importez api au lieu d'axios directement

export default {
  name: 'SigleWork',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      work: null,
      relatedWorks: [],
      isLoading: true,
      error: null,
    }
  },
  async created() {
    await this.fetchWorkData()
  },
  async mounted() {
    if (this.work) {
      this.updateMetaTags()
    }
  },
  watch: {
    '$route.params.slug': {
      handler: async function () {
        await this.fetchWorkData()
        if (this.work) {
          this.updateMetaTags()
        }
      },
      immediate: false,
    },
    work: {
      handler: function (newWork) {
        if (newWork) {
          this.updateMetaTags()
        }
      },
      immediate: false,
    },
  },
  methods: {
    async fetchWorkData() {
      try {
        this.isLoading = true
        this.error = null

        const slug = this.$route.params.slug
        console.log('Fetching work with slug:', slug)

        // Utiliser api.get au lieu de axios.get directement
        const response = await api.get(`/works/${slug}`)
        console.log('API Response:', response)

        this.work = response.data

        // Si l'image est un chemin relatif, ajouter l'URL de base du backend
        if (
          this.work.image &&
          !this.work.image.startsWith('http') &&
          !this.work.image.startsWith('/')
        ) {
          this.work.image = `http://localhost:8000${this.work.image}`
        }

        // Normaliser les données
        this.work = this.normalizeWorkData(this.work)

        // Charger les travaux connexes
        if (this.work && this.work.technologies && this.work.technologies.length > 0) {
          this.fetchRelatedWorks(this.work.technologies[0])
        }
      } catch (error) {
        console.error('Error fetching work details:', error)
        if (error.response) {
          console.error('Response status:', error.response.status)
          console.error('Response data:', error.response.data)
        }
        this.error = `Failed to load work details: ${error.message || 'Unknown error'}`
        this.work = null
      } finally {
        this.isLoading = false
      }
    },

    async fetchRelatedWorks(technology) {
      try {
        // Utiliser api.get au lieu de axios.get directement
        const response = await api.get(`/works/technology/${technology}`)
        console.log('Related works response:', response)

        let relatedWorks = []
        if (response.data && response.data.data) {
          relatedWorks = response.data.data
        } else if (Array.isArray(response.data)) {
          relatedWorks = response.data
        }

        // Filtrer pour exclure le travail actuel
        this.relatedWorks = relatedWorks
          .filter((w) => w.id !== this.work.id)
          .map(this.normalizeWorkData)
          .slice(0, 3) // Limiter à 3 travaux connexes
      } catch (error) {
        console.error('Error fetching related works:', error)
        this.relatedWorks = []
      }
    },

    getWorkTechnologies(work) {
      if (!work || !work.technologies) return []

      // Si technologies est une chaîne JSON, essayer de la parser
      if (typeof work.technologies === 'string') {
        try {
          return JSON.parse(work.technologies)
        } catch (e) {
          return work.technologies.split(',').map((tech) => tech.trim())
        }
      }

      // Si technologies est un objet, le convertir en tableau
      if (typeof work.technologies === 'object' && !Array.isArray(work.technologies)) {
        return Object.values(work.technologies)
      }

      // Si technologies est déjà un tableau, le retourner tel quel
      if (Array.isArray(work.technologies)) {
        return work.technologies
      }

      return []
    },

    normalizeWorkData(work) {
      if (!work) return null

      // S'assurer que les technologies sont correctement formatées
      if (work.technologies) {
        work.technologies = this.getWorkTechnologies(work)
      } else {
        work.technologies = []
      }

      // S'assurer que l'URL de l'image est complète
      if (work.image && !work.image.startsWith('http') && !work.image.startsWith('/')) {
        work.image = `/${work.image}`
      }

      return work
    },

    navigateToWork(slug) {
      if (slug === this.$route.params.slug) return
      this.$router.push(`/work/${slug}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    updateMetaTags() {
      document.title = `${this.work.title} | BEZARA Florent - Développeur Web`

      const description = this.work.description
        ? this.work.description.substring(0, 160)
        : 'Professional work by BEZARA Florent'

      // Fonction pour mettre à jour une balise meta ou la créer si elle n'existe pas
      const updateMeta = (name, content) => {
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
      }

      // Mettre à jour les balises meta
      updateMeta('description', description)
      updateMeta('og:title', this.work.title)
      updateMeta('og:description', description)
      updateMeta('og:type', 'website')
      updateMeta('og:url', window.location.href)

      if (this.work.image) {
        updateMeta(
          'og:image',
          this.work.image.startsWith('http')
            ? this.work.image
            : `${window.location.origin}${this.work.image}`,
        )
      }

      // Twitter Cards
      updateMeta('twitter:card', 'summary_large_image')
      updateMeta('twitter:title', this.work.title)
      updateMeta('twitter:description', description)

      if (this.work.image) {
        updateMeta(
          'twitter:image',
          this.work.image.startsWith('http')
            ? this.work.image
            : `${window.location.origin}${this.work.image}`,
        )
      }

      // Structured data for SEO
      const addStructuredData = () => {
        const existingScript = document.querySelector('script[type="application/ld+json"]')
        if (existingScript) {
          existingScript.remove()
        }

        const projectSchema = {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: this.work.title,
          description: description,
          image: this.work.image
            ? this.work.image.startsWith('http')
              ? this.work.image
              : `${window.location.origin}${this.work.image}`
            : '',
          author: {
            '@type': 'Person',
            name: 'BEZARA Florent',
          },
          datePublished: this.work.created_at || new Date().toISOString(),
          url: window.location.href,
        }

        const script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        script.textContent = JSON.stringify(projectSchema)
        document.head.appendChild(script)
      }

      addStructuredData()
    },

    stripHtml(html) {
      const temp = document.createElement('div')
      temp.innerHTML = html
      return temp.textContent || temp.innerText || ''
    },
  },
}
</script>
