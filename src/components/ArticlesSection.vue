<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <!-- En-tête avec titre et barre de recherche -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 gap-4">
        <h3 class="section-title mb-0">Articles</h3>

        <!-- Barre de recherche -->
        <div class="relative w-full md:w-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="bg-gray-800/40 border border-gray-700 rounded-full py-2 pl-10 pr-4 w-full md:w-64 text-sm text-color-text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            @input="handleSearch"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Utilisation du composant AppLoader -->
      <AppLoader v-if="isLoading" message="Chargement des articles..." />

      <!-- Utilisation du composant AppError -->
      <AppError v-else-if="error" :message="error" />

      <!-- Liste des articles -->
      <div v-else class="space-y-5">
        <div
          v-for="(article, index) in paginatedArticles"
          :key="article.id"
          class="card p-6 fade-in-up hover:shadow-lg transition-all duration-300"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Titre + badge de technologie -->
          <div class="flex flex-wrap items-start justify-between">
            <h4 class="text-lg font-semibold text-color-text-light flex-1">{{ article.title }}</h4>
            <span
              class="tech-badge text-xs ml-2 mt-1"
              :class="getCategoryBadgeClass(article.category)"
            >
              {{ article.category }}
            </span>
          </div>

          <!-- Métadonnées -->
          <div class="flex items-center mt-2">
            <p class="text-color-text-medium text-xs">
              {{ formatDate(article.published_at) }} • {{ article.read_time }} minute read
            </p>
          </div>

          <!-- Contenu avec effet de gradient subtil sur le texte -->
          <p class="text-color-text-medium mt-3 leading-relaxed line-clamp-3">
            {{ article.content }}
          </p>

          <!-- Bouton de lecture -->
          <div class="mt-4 pt-3 border-t border-gray-700">
            <router-link
              :to="`/articles/${article.slug}`"
              class="btn text-sm inline-flex items-center rounded-md py-2 px-4 transition-all duration-300 hover:opacity-90"
              :class="getArticleButtonClass(article.category)"
            >
              Read Article
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1"
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
            </router-link>
          </div>
        </div>

        <!-- Message si aucun article -->
        <div v-if="filteredArticles.length === 0" class="text-center py-8 text-color-text-medium">
          Aucun article disponible correspondant à votre recherche.
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="!isLoading && !error && filteredArticles.length > 0"
        class="mt-8 flex justify-center"
      >
        <div class="flex items-center space-x-2">
          <!-- Bouton page précédente -->
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 text-color-text-light disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800/40 transition-colors"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
          </button>

          <!-- Numéros de page -->
          <div
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            :class="
              page === currentPage
                ? 'bg-gray-700 text-white'
                : 'text-color-text-light hover:bg-gray-800/40'
            "
          >
            {{ page }}
          </div>

          <!-- Bouton page suivante -->
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 text-color-text-light disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800/40 transition-colors"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../api'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppError from '@/components/ui/AppError.vue'

export default {
  name: 'ArticlesSection',
  components: {
    AppLoader,
    AppError,
  },
  data() {
    return {
      isLoading: true,
      error: null,
      articles: [],
      searchQuery: '',
      currentPage: 1,
      articlesPerPage: 3,
    }
  },
  computed: {
    filteredArticles() {
      if (!this.searchQuery) {
        return this.articles
      }

      const query = this.searchQuery.toLowerCase()
      return this.articles.filter((article) => {
        return (
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
        )
      })
    },
    totalPages() {
      return Math.ceil(this.filteredArticles.length / this.articlesPerPage)
    },
    paginatedArticles() {
      const startIndex = (this.currentPage - 1) * this.articlesPerPage
      const endIndex = startIndex + this.articlesPerPage
      return this.filteredArticles.slice(startIndex, endIndex)
    },
  },
  async created() {
    await this.fetchArticles()
  },
  methods: {
    async fetchArticles() {
      try {
        this.isLoading = true
        this.error = null

        const response = await api.get('/articles')
        this.articles = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error)
        this.error = 'Impossible de charger les articles. Veuillez réessayer plus tard.'

        // Données fallback pour le design en développement
        if (process.env.NODE_ENV === 'development') {
          this.error = null
          this.articles = [
            {
              id: 1,
              title: 'Building Modern SPAs with Laravel and Vue.js',
              category: 'LARAVEL',
              published_at: '2025-02-15',
              read_time: 3,
              content:
                'In this article, I explore the powerful combination of Laravel and Vue.js for building modern single-page applications. Learn how to leverage the best of both worlds for your next project.',
              slug: 'building-modern-spas',
            },
            {
              id: 2,
              title: 'Mastering Tailwind CSS: Advanced Techniques',
              category: 'TAILWIND',
              published_at: '2025-01-10',
              read_time: 4,
              content:
                'Discover advanced techniques for getting the most out of Tailwind CSS. From custom configurations to optimizing your workflow, this guide covers everything you need to know.',
              slug: 'mastering-tailwind-css',
            },
            {
              id: 3,
              title: 'Vue 3 Composition API: A Practical Guide',
              category: 'VUE',
              published_at: '2024-12-05',
              read_time: 5,
              content:
                'The Composition API is a game-changer for Vue developers. This comprehensive guide walks through real-world examples and best practices for structuring your Vue 3 applications.',
              slug: 'vue-composition-api',
            },
            {
              id: 4,
              title: 'Getting Started with TypeScript in Vue Projects',
              category: 'TYPESCRIPT',
              published_at: '2024-11-20',
              read_time: 4,
              content:
                'TypeScript adds powerful type checking to your Vue projects. This tutorial guides you through setting up and using TypeScript effectively with Vue to create more robust applications.',
              slug: 'typescript-in-vue',
            },
            {
              id: 5,
              title: 'Modern PHP Features Every Developer Should Know',
              category: 'PHP',
              published_at: '2024-10-15',
              read_time: 6,
              content:
                'PHP has evolved significantly over the years. Learn about modern PHP features like attributes, union types, and more that can help you write cleaner, more maintainable code.',
              slug: 'modern-php-features',
            },
            {
              id: 6,
              title: 'Optimizing JavaScript Performance in the Browser',
              category: 'JAVASCRIPT',
              published_at: '2024-09-30',
              read_time: 7,
              content:
                'Performance matters! This comprehensive guide explains techniques for optimizing JavaScript performance in modern browsers, from efficient DOM manipulation to memory management.',
              slug: 'javascript-performance',
            },
          ]
        }
      } finally {
        this.isLoading = false
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('en-GB', {
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
        CSS: 'tailwind-badge', // Réutiliser le style de Tailwind pour CSS
        WORDPRESS: 'bg-indigo-500/20 text-indigo-300 border border-indigo-600/30',
        'SIDE PROJECTS': 'bg-purple-500/20 text-purple-300 border border-purple-600/30',
        LIFE: 'bg-teal-500/20 text-teal-300 border border-teal-600/30',
      }

      // Convert to uppercase for case-insensitive matching
      const upperCategory = category.toUpperCase()
      return categoryMap[upperCategory] || 'bg-gray-700/30 text-gray-300 border border-gray-600'
    },

    getArticleButtonClass(category) {
      const upperCategory = category.toUpperCase()
      const buttonClasses = {
        LARAVEL: 'bg-red-700/80 hover:bg-red-600/80 text-white border-red-500/30',
        VUE: 'bg-green-700/80 hover:bg-green-600/80 text-white border-green-500/30',
        TAILWIND: 'bg-blue-700/80 hover:bg-blue-600/80 text-white border-blue-500/30',
        PHP: 'bg-purple-700/80 hover:bg-purple-600/80 text-white border-purple-500/30',
        JAVASCRIPT: 'bg-yellow-700/80 hover:bg-yellow-600/80 text-white border-yellow-500/30',
        TYPESCRIPT: 'bg-blue-700/80 hover:bg-blue-600/80 text-white border-blue-500/30',
      }

      return buttonClasses[upperCategory] || 'bg-gray-700 hover:bg-gray-600 text-white'
    },

    handleSearch() {
      // Reset to first page when searching
      this.currentPage = 1
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },

    goToPage(page) {
      this.currentPage = page
    },
  },
}
</script>
