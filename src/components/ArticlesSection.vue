<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <h3 class="section-title">Articles</h3>
      <div class="space-y-5">
        <div
          v-for="(article, index) in articles"
          :key="article.id"
          class="card p-6 fade-in-up"
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
          <p class="text-color-text-medium mt-3 leading-relaxed">{{ article.content }}</p>

          <!-- Bouton de lecture -->
          <div class="mt-4 pt-3 border-t border-gray-700">
            <router-link
              :to="`/articles/${article.slug}`"
              class="btn text-sm inline-flex items-center"
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
      </div>
    </div>
  </section>
</template>

<script>
import api from '../api'

export default {
  name: 'ArticlesSection',
  data() {
    return {
      articles: [],
    }
  },
  async created() {
    try {
      const response = await api.get('/articles')
      this.articles = response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error)
      // Données fallback pour le design
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
      ]
    }
  },
  methods: {
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
        PHP: 'bg-gray-700/30 text-gray-300 border border-gray-600',
        JAVASCRIPT: 'bg-gray-700/30 text-gray-300 border border-gray-600',
        CSS: 'bg-gray-700/30 text-gray-300 border border-gray-600',
        WORDPRESS: 'bg-gray-700/30 text-gray-300 border border-gray-600',
        'SIDE PROJECTS': 'bg-gray-700/30 text-gray-300 border border-gray-600',
        LIFE: 'bg-gray-700/30 text-gray-300 border border-gray-600',
      }

      // Convert to uppercase for case-insensitive matching
      const upperCategory = category.toUpperCase()
      return categoryMap[upperCategory] || 'bg-gray-700/30 text-gray-300 border border-gray-600'
    },

    getArticleButtonClass(category) {
      const upperCategory = category.toUpperCase()
      if (upperCategory === 'LARAVEL') {
        return 'btn-laravel'
      } else if (upperCategory === 'VUE') {
        return 'btn-vue'
      } else if (upperCategory === 'TAILWIND') {
        return 'btn-tailwind'
      } else {
        return ''
      }
    },
  },
}
</script>
