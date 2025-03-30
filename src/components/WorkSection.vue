<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <h3 class="section-title">Recent Works</h3>

      <AppLoader v-if="isLoading" message="Loading works..." />
      <AppError v-else-if="error" :message="error" />

      <div v-else>
        <div v-if="works.length === 0" class="text-center py-8 text-gray-400">
          <p>No works found.</p>
        </div>

        <div v-else class="space-y-6">
          <div
            v-for="work in works"
            :key="work.id"
            class="work-item bg-gray-900/50 border border-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-900/70 transition-all duration-300"
            @click="navigateToWork(work.slug)"
          >
            <div class="flex flex-col md:flex-row">
              <!-- Image -->
              <div class="md:w-48 h-48 md:h-auto bg-gray-800/50 relative">
                <img
                  v-if="work.image"
                  :src="work.image"
                  :alt="work.title"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg
                    class="w-12 h-12 text-gray-600"
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

              <!-- Content -->
              <div class="flex-1 p-5">
                <div class="flex flex-col h-full justify-between">
                  <!-- Header -->
                  <div>
                    <div class="flex flex-wrap justify-between items-start mb-2 gap-2">
                      <h4 class="text-xl font-bold text-color-text-light">{{ work.title }}</h4>
                      <span class="px-2.5 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full">{{
                        work.year
                      }}</span>
                    </div>

                    <div v-if="work.client_name" class="text-sm text-gray-400 mb-3">
                      Client: <span class="text-gray-300">{{ work.client_name }}</span>
                    </div>

                    <p class="text-color-text-medium text-sm mb-4 line-clamp-2">
                      {{ work.description }}
                    </p>
                  </div>

                  <!-- Footer -->
                  <div>
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span
                        v-for="(tech, index) in parseTechnologies(work.technologies)"
                        :key="index"
                        class="px-2.5 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full"
                      >
                        {{ tech }}
                      </span>
                    </div>

                    <div class="flex flex-wrap gap-3 mt-auto">
                      <router-link
                        :to="`/work/${work.slug}`"
                        class="text-sm inline-flex items-center px-3 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                      >
                        <svg
                          class="h-4 w-4 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
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
                        View Details
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <router-link
            to="/work"
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            View All Works
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppLoader from '@/components/ui/AppLoader.vue'
import AppError from '@/components/ui/AppError.vue'
import axios from 'axios'

export default {
  name: 'WorkSection',
  components: {
    AppLoader,
    AppError,
  },
  data() {
    return {
      works: [],
      isLoading: true,
      error: null,
    }
  },
  created() {
    this.fetchWorks()
  },
  methods: {
    async fetchWorks() {
      try {
        this.isLoading = true
        console.log('Fetching works from API...')

        const response = await axios.get('http://localhost:8000/api/works/featured')
        console.log('API response:', response)

        if (Array.isArray(response.data)) {
          this.works = response.data
        } else if (response.data && Array.isArray(response.data.data)) {
          this.works = response.data.data
        } else if (response.data && typeof response.data === 'object') {
          this.works = [response.data]
        } else {
          this.works = []
        }

        console.log('Processed works:', this.works)
      } catch (err) {
        console.error('Error fetching works:', err)
        this.error = 'Failed to load works. Please try again later.'
      } finally {
        this.isLoading = false
      }
    },

    navigateToWork(slug) {
      this.$router.push(`/work/${slug}`)
    },

    parseTechnologies(technologies) {
      if (!technologies) return []

      if (Array.isArray(technologies)) {
        return technologies
      }

      if (typeof technologies === 'string') {
        try {
          const parsed = JSON.parse(technologies)
          return Array.isArray(parsed) ? parsed : []
        } catch (e) {
          return technologies.split(',').map((t) => t.trim())
        }
      }

      if (typeof technologies === 'object') {
        return Object.values(technologies)
      }

      return []
    },
  },
}
</script>
