<template>
  <div>
    <Header />
    <section class="mb-12">
      <div class="portfolio-container">
        <div v-if="isLoading" class="py-8 text-center text-gray-400">
          <svg
            class="w-8 h-8 mx-auto mb-2 animate-spin"
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
            class="w-8 h-8 mx-auto mb-2"
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

        <article v-else-if="article" class="p-6 rounded-lg card backdrop-blur-md">
          <header>
            <h1 class="mb-4 text-3xl font-bold text-color-text-light">{{ article.title }}</h1>
            <div class="flex items-center mb-4 space-x-2">
              <span class="text-xs tech-badge" :class="getCategoryBadgeClass(article.category)">
                {{ article.category }}
              </span>
              <time :datetime="article.published_at" class="text-xs text-color-text-medium">
                {{ formatDate(article.published_at) }} • {{ article.read_time }} minute read
              </time>
            </div>

            <!-- Auteur -->
            <div v-if="article.author" class="flex items-center mb-6">
              <span
                class="flex items-center justify-center w-10 h-10 mr-3 text-2xl rounded-full bg-gray-800/50"
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

            <!-- Image principale avec gestion des erreurs -->
            <div v-if="article.cover_image" class="mb-6">
              <img
                :src="article.cover_image"
                :alt="article.title"
                class="object-cover w-full h-auto rounded-lg"
                loading="lazy"
                @error="handleImageError"
              />
            </div>
          </header>

          <!-- Contenu avec support de Markdown - Amélioration de la détection-->
          <div
            v-if="!isMarkdown"
            class="prose prose-lg max-w-none text-color-text-medium prose-headings:text-color-text-light prose-strong:text-color-text-light prose-a:text-tailwind-blue prose-a:no-underline hover:prose-a:underline"
            v-html="article.content"
          ></div>
          <div
            v-else
            class="prose prose-lg max-w-none text-color-text-medium prose-headings:text-color-text-light prose-strong:text-color-text-light prose-a:text-tailwind-blue prose-a:no-underline hover:prose-a:underline"
            v-html="renderedContent"
          ></div>

          <footer class="pt-6 mt-8 border-t border-gray-700">
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
              <h3 class="mb-3 text-lg font-medium text-color-text-light">Articles connexes</h3>
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
              class="inline-flex items-center mt-6 text-tailwind-blue hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 mr-1"
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
import { marked } from 'marked' // Importez marked pour le support markdown
// Import DOMPurify pour sécuriser le HTML
import DOMPurify from 'dompurify'
// Import highlight.js pour la coloration syntaxique (si besoin)
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' // Thème de coloration

export default {
  name: 'SingleArticle',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      article: null,
      isLoading: true,
      error: null,
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.gasycoder.com/api',
      imageFallbackUrl: '/images/article-placeholder.jpg', // Image de remplacement en cas d'erreur
    }
  },
  computed: {
    baseUrl() {
      // Extraire la base URL sans le /api
      return this.apiBaseUrl.replace(/\/api$/, '')
    },
    // Détecte si le contenu est au format markdown - Amélioration de la détection
    isMarkdown() {
      if (!this.article || !this.article.content) return false

      // Vérifier d'abord le flag explicite s'il existe
      if (this.article.is_markdown === true) return true

      // Sinon détecter automatiquement les motifs markdown courants
      const markdownPatterns = [
        /^#\s+/m, // Titre h1
        /^##\s+/m, // Titre h2
        /^###\s+/m, // Titre h3
        /^>/m, // Citation
        /^-\s+/m, // Liste à puces
        /^[0-9]+\.\s+/m, // Liste numérotée
        /\[.+\]\(.+\)/, // Lien
        /!\[.+\]\(.+\)/, // Image
        /^```[\s\S]+```$/m, // Bloc de code
        /\*\*.+\*\*/, // Gras
        /\*.+\*/, // Italique
        /~~.+~~/, // Barré
        /^---$/m, // Ligne horizontale
      ]

      return markdownPatterns.some((pattern) => pattern.test(this.article.content))
    },
    // Convertit le markdown en HTML avec meilleure coloration syntaxique
    renderedContent() {
      if (!this.article || !this.article.content) return ''

      // Configuration de marked pour la sécurité et la coloration syntaxique
      marked.setOptions({
        gfm: true, // GitHub Flavored Markdown
        breaks: true, // Line breaks as <br>
        smartLists: true, // Meilleure gestion des listes
        smartypants: true, // Smart typographic punctuation
        highlight: function (code, lang) {
          // Utilisation de highlight.js pour la coloration syntaxique
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(code, { language: lang }).value
            } catch (e) {
              console.error(e)
            }
          }
          return hljs.highlightAuto(code).value
        },
      })

      try {
        // Conversion de markdown à HTML avec DOMPurify pour la sécurité
        const rawHtml = marked.parse(this.article.content)
        return DOMPurify.sanitize(rawHtml, {
          ADD_TAGS: ['iframe'], // Permet des iframes si besoin (par ex. pour YouTube)
          ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
          FORBID_TAGS: ['style'], // Interdit les balises de style inline qui pourraient casser le design
        })
      } catch (error) {
        console.error('Erreur lors du rendu markdown:', error)
        return this.article.content
      }
    },
  },
  async created() {
    await this.fetchArticleData()
  },
  async mounted() {
    if (this.article) {
      this.updateMetaTags()
    }
    // Ajouter les classes pour highlight.js
    this.applyCodeHighlighting()
  },
  updated() {
    // Appliquer la coloration syntaxique après chaque mise à jour
    this.$nextTick(() => {
      this.applyCodeHighlighting()
    })
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

        // Traitement des images avec validation améliorée
        this.processArticleImages()
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article depuis l'API:", error)
        this.error = "Impossible de charger l'article depuis l'API. Affichage des données locales."

        // Recherche dans le JSON statique comme fallback
        const fallbackArticle = articlesData.find((a) => a.slug === this.$route.params.slug)
        if (fallbackArticle) {
          this.article = fallbackArticle
          // Si l'image est présente dans le JSON, ajuste son chemin
          this.processArticleImages()
        } else {
          this.article = null
          this.error = 'Article non trouvé, même dans les données locales.'
        }
      } finally {
        this.isLoading = false
      }
    },
    // Méthode unifiée pour traiter les images
    processArticleImages() {
      if (!this.article) return

      // Traiter l'image de couverture
      if (this.article.cover_image) {
        this.article.cover_image = this.fixImagePath(this.article.cover_image)
      }

      // Traiter les images dans le contenu markdown
      if (this.article.content && this.isMarkdown) {
        this.article.content = this.fixImagePathsInMarkdown(this.article.content)
      }
    },
    // Méthode pour corriger le chemin d'une image individuelle
    fixImagePath(path) {
      if (!path) return ''

      // Si c'est déjà une URL complète, on ne touche à rien
      if (path.startsWith('http') || path.startsWith('data:')) {
        return path
      }

      // Sinon, on construit le chemin complet
      if (path.startsWith('/')) {
        const baseUrl = this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl
        return `${baseUrl}${path}`
      } else {
        const baseUrl = this.baseUrl.endsWith('/') ? this.baseUrl : `${this.baseUrl}/`
        return `${baseUrl}${path}`
      }
    },
    // Fonction améliorée pour corriger les chemins d'images dans le contenu markdown
    fixImagePathsInMarkdown(content) {
      // Détecte les références d'images markdown ![alt](path) et les corrige
      const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
      return content.replace(imgRegex, (match, alt, path) => {
        const fixedPath = this.fixImagePath(path)
        return `![${alt}](${fixedPath})`
      })
    },
    // Gestion des erreurs d'image
    handleImageError(event) {
      // Remplacer par l'image par défaut en cas d'échec de chargement
      event.target.src = this.imageFallbackUrl
    },
    // Appliquer highlight.js à tous les blocs de code après le rendu
    applyCodeHighlighting() {
      if (this.isMarkdown) {
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block)
        })
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
          logo: {
            '@type': 'ImageObject',
            url: `${window.location.origin}/logo.png`, // URL dynamique pour le logo
          },
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

<style>
/* Styles pour le rendu markdown */
.prose pre {
  background-color: rgba(30, 41, 59, 0.8);
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5em 0;
}

.prose code {
  background-color: rgba(30, 41, 59, 0.6);
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  color: #e5e7eb;
  font-size: 0.9em;
  line-height: 1.6;
}

.prose blockquote {
  border-left: 4px solid #38bdf8;
  padding: 0.5rem 0 0.5rem 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #94a3b8;
  background-color: rgba(30, 41, 59, 0.3);
  border-radius: 0 0.25rem 0.25rem 0;
}

.prose img {
  border-radius: 0.375rem;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.5rem auto;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.prose a {
  color: #38bdf8;
  text-decoration: none;
  transition: text-decoration 0.15s ease;
}

.prose a:hover {
  text-decoration: underline;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  overflow-x: auto;
  display: block;
}

.prose thead {
  background-color: rgba(30, 41, 59, 0.4);
}

.prose th,
.prose td {
  padding: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  text-align: left;
}

.prose tr:nth-child(even) {
  background-color: rgba(30, 41, 59, 0.2);
}

/* Améliorations pour les listes */
.prose ul,
.prose ol {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose ul {
  list-style-type: disc;
}

.prose ol {
  list-style-type: decimal;
}

/* Améliorations pour les titres */
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.25;
}

.prose h1 {
  font-size: 2em;
}

.prose h2 {
  font-size: 1.5em;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.prose h3 {
  font-size: 1.25em;
}

.prose h4 {
  font-size: 1em;
}

/* Styles pour la coloration syntaxique des blocs de code */
.hljs {
  background: transparent;
}

/* Animation pour les images lors du chargement */
.prose img {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.prose img.loaded {
  opacity: 1;
}

/* Style pour les liens dans les blocs de code */
.prose pre a {
  color: inherit;
  text-decoration: underline;
  text-decoration-style: dotted;
}
</style>
