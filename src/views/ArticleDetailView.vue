<template>
  <div>
    <Header />
    <section class="mb-12">
      <div class="portfolio-container">
        <div v-if="article" class="bg-white p-6 rounded-lg shadow-sm">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ article.title }}</h1>
          <div class="flex items-center space-x-2 mb-4">
            <span class="text-gray-500 text-xs border border-gray-300 rounded-full px-2 py-0.5">{{
              article.category
            }}</span>
            <p class="text-gray-500 text-xs">
              {{ formatDate(article.published_at) }} • {{ article.read_time }} minute read
            </p>
          </div>
          <p class="text-gray-600">{{ article.content }}</p>
          <router-link to="/articles" class="text-blue-600 mt-4 inline-flex items-center">
            Back to Articles
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </router-link>
        </div>
        <p v-else class="text-gray-600">Loading...</p>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import api from '../api'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'ArticleDetailView',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      article: null,
    }
  },
  async created() {
    try {
      const slug = this.$route.params.slug
      const response = await api.get(`/articles/${slug}`)
      this.article = response.data
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article:", error)
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
  },
}
</script>
