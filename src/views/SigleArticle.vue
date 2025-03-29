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
          <p>Chargement de l'article...</p>
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

        <article v-else-if="article" class="card p-6 backdrop-blur-md rounded-lg">
          <header>
            <h1 class="text-3xl font-bold text-color-text-light mb-4">{{ article.title }}</h1>
            <div class="flex items-center space-x-2 mb-4">
              <span class="tech-badge text-xs" :class="getCategoryBadgeClass(article.category)">
                {{ article.category }}
              </span>
              <time :datetime="article.published_at" class="text-color-text-medium text-xs">
                {{ formatDate(article.published_at) }} • {{ article.read_time }} minute read
              </time>
            </div>

            <!-- Auteur -->
            <div v-if="article.author" class="flex items-center mb-6">
              <span
                class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 text-2xl mr-3"
                >👨‍💻</span
              >
              <div>
                <span class="block text-sm font-medium text-color-text-light">{{
                  article.author.name
                }}</span>
                <span v-if="article.author.title" class="block text-xs text-color-text-medium">{{
                  article.author.title
                }}</span>
              </div>
            </div>

            <!-- Image principale -->
            <img
              v-if="article.cover_image"
              :src="article.cover_image"
              :alt="article.title"
              class="w-full h-auto rounded-lg mb-6 object-cover"
              loading="lazy"
            />
          </header>

          <div
            class="prose prose-lg max-w-none text-color-text-medium prose-headings:text-color-text-light prose-strong:text-color-text-light prose-a:text-tailwind-blue prose-a:no-underline hover:prose-a:underline"
            v-html="article.content"
          ></div>

          <footer class="mt-8 pt-6 border-t border-gray-700">
            <div v-if="article.tags && article.tags.length" class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="bg-gray-800/50 text-color-text-medium text-xs font-medium rounded-full px-2.5 py-1"
              >
                #{{ tag }}
              </span>
            </div>

            <div v-if="article.related_articles && article.related_articles.length" class="mt-6">
              <h3 class="text-lg font-medium text-color-text-light mb-3">Articles connexes</h3>
              <ul class="space-y-2">
                <li
                  v-for="relatedArticle in article.related_articles"
                  :key="relatedArticle.slug"
                  class="text-tailwind-blue hover:underline"
                >
                  <router-link :to="`/articles/${relatedArticle.slug}`">
                    {{ relatedArticle.title }}
                  </router-link>
                </li>
              </ul>
            </div>

            <router-link
              to="/articles"
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
              Retour aux articles
            </router-link>
          </footer>
        </article>

        <div v-else class="py-8 text-center text-gray-400">
          <p>Article non trouvé</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import api from '../api'
import articlesData from '../data/articles.json' // Importe le JSON comme fallback
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'SigleArticle',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      article: null,
      isLoading: true,
      error: null,
    }
  },
  async created() {
    await this.fetchArticleData()
  },
  async mounted() {
    if (this.article) {
      this.updateMetaTags()
    }
  },
  watch: {
    '$route.params.slug': {
      handler: async function () {
        await this.fetchArticleData()
        if (this.article) {
          this.updateMetaTags()
        }
      },
      immediate: false,
    },
    article: {
      handler: function (newArticle) {
        if (newArticle) {
          this.updateMetaTags()
        }
      },
      immediate: false,
    },
  },
  methods: {
    async fetchArticleData() {
      try {
        this.isLoading = true
        this.error = null

        const slug = this.$route.params.slug
        const response = await api.get(`/articles/${slug}`)
        this.article = response.data

        // Si l'image est un chemin relatif, ajoute l'URL de base du backend
        if (this.article.cover_image && !this.article.cover_image.startsWith('http')) {
          this.article.cover_image = `http://localhost:8000${this.article.cover_image}` // Ajuste selon ton domaine
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article depuis l'API:", error)
        this.error = "Impossible de charger l'article depuis l'API. Affichage des données locales."

        // Recherche dans le JSON statique comme fallback
        const fallbackArticle = articlesData.find((a) => a.slug === this.$route.params.slug)
        if (fallbackArticle) {
          this.article = fallbackArticle
          // Si l'image est présente dans le JSON, ajuste son chemin si nécessaire
          if (this.article.cover_image && !this.article.cover_image.startsWith('http')) {
            this.article.cover_image = `/images/${this.article.cover_image}` // Ajuste selon ton dossier public
          }
        } else {
          this.article = null
          this.error = 'Article non trouvé, même dans les données locales.'
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
    getCategoryBadgeClass(category) {
      const categoryMap = {
        LARAVEL: 'laravel-badge',
        VUE: 'vue-badge',
        TAILWIND: 'tailwind-badge',
        PHP: 'php-badge',
        JAVASCRIPT: 'js-badge',
        TYPESCRIPT: 'ts-badge',
        CSS: 'tailwind-badge',
        WORDPRESS: 'bg-indigo-500/20 text-indigo-300 border border-indigo-600/30',
        'SIDE PROJECTS': 'bg-purple-500/20 text-purple-300 border border-purple-600/30',
        LIFE: 'bg-teal-500/20 text-teal-300 border border-teal-600/30',
      }
      const upperCategory = category ? category.toUpperCase() : ''
      return categoryMap[upperCategory] || 'bg-gray-700/30 text-gray-300 border border-gray-600'
    },
    updateMetaTags() {
      document.title = `${this.article.title} | BEZARA Florent - Développeur Web`
      const description =
        this.article.description ||
        this.stripHtmlTags(this.article.content).substring(0, 160) + '...'

      this.updateMetaTag('description', description)
      this.updateMetaTag('og:title', this.article.title)
      this.updateMetaTag('og:description', description)
      this.updateMetaTag('og:type', 'article')
      this.updateMetaTag('og:url', window.location.href)
      if (this.article.cover_image) {
        this.updateMetaTag('og:image', this.article.cover_image)
      }
      this.updateMetaTag('twitter:card', 'summary_large_image')
      this.updateMetaTag('twitter:title', this.article.title)
      this.updateMetaTag('twitter:description', description)
      if (this.article.cover_image) {
        this.updateMetaTag('twitter:image', this.article.cover_image)
      }
      if (this.article.published_at) {
        this.updateMetaTag(
          'article:published_time',
          new Date(this.article.published_at).toISOString(),
        )
      }
      if (this.article.modified_at) {
        this.updateMetaTag(
          'article:modified_time',
          new Date(this.article.modified_at).toISOString(),
        )
      }
      if (this.article.tags) {
        document.querySelectorAll('meta[name="keywords"]').forEach((el) => el.remove())
        const metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        metaKeywords.setAttribute('content', this.article.tags.join(', '))
        document.head.appendChild(metaKeywords)
      }
      this.updateCanonicalLink()
      this.addStructuredData()
    },
    stripHtmlTags(html) {
      const tmp = document.createElement('div')
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ''
    },
    updateMetaTag(name, content) {
      let meta =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        if (name.startsWith('og:') || name.startsWith('twitter:') || name.startsWith('article:')) {
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
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: this.article.title,
        description:
          this.article.description ||
          this.stripHtmlTags(this.article.content).substring(0, 160) + '...',
        image: this.article.cover_image || '',
        author: {
          '@type': 'Person',
          name: this.article.author?.name || 'BEZARA Florent',
        },
        publisher: {
          '@type': 'Organization',
          name: 'BEZARA Florent',
          logo: { '@type': 'ImageObject', url: 'https://ton-site.com/logo.png' },
        },
        datePublished: new Date(this.article.published_at).toISOString(),
        dateModified: new Date(this.article.modified_at || this.article.published_at).toISOString(),
        mainEntityOfPage: { '@type': 'WebPage', '@id': window.location.href },
      }
      const script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.textContent = JSON.stringify(articleSchema)
      document.head.appendChild(script)
    },
  },
}
</script>
