<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <div class="relative overflow-hidden rounded-lg shadow-lg">
        <!-- Background avec patterns tech -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-laravel-dark via-vue-dark to-tailwind-dark opacity-90"
        ></div>
        <div class="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="laravel-pattern"
                x="0"
                y="0"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path d="M15 0L30 15H15L0 30V15L15 0Z" fill="#FF2D20" fill-opacity="0.2" />
              </pattern>
              <pattern
                id="vue-pattern"
                x="15"
                y="15"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path d="M15 0L30 15L15 30L0 15L15 0Z" fill="#41B883" fill-opacity="0.2" />
              </pattern>
              <pattern
                id="tailwind-pattern"
                x="30"
                y="0"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <rect x="5" y="5" width="20" height="20" rx="3" fill="#38BDF8" fill-opacity="0.2" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#laravel-pattern)" />
            <rect x="0" y="0" width="100%" height="100%" fill="url(#vue-pattern)" />
            <rect x="0" y="0" width="100%" height="100%" fill="url(#tailwind-pattern)" />
          </svg>
        </div>

        <!-- Content -->
        <div class="relative z-10 p-4 sm:p-6 md:p-8 text-center">
          <div
            class="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-gray-800/50 backdrop-blur-sm mb-2"
          >
            <span class="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-vue-green mr-1"></span>
            <span class="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-laravel-red mr-1"></span>
            <span class="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-tailwind-blue mr-1"></span>
            <p class="text-xs font-medium uppercase tracking-wider text-gray-300">Newsletter</p>
          </div>

          <h2 class="text-xl sm:text-2xl font-bold mt-2 text-tech-gradient">Stay Up To Date</h2>
          <p class="mt-1 sm:mt-2 text-sm sm:text-base text-gray-300">Laravel, Vue & Tailwind CSS</p>

          <!-- Form avec gradient border - responsive pour mobile -->
          <div class="mt-4 sm:mt-6 flex justify-center">
            <div
              class="p-0.5 rounded-md bg-gradient-to-r from-vue-green via-laravel-red to-tailwind-blue inline-flex w-full max-w-xs sm:max-w-md"
            >
              <div class="flex flex-col sm:flex-row w-full bg-gray-900 rounded-md">
                <input
                  v-model="email"
                  type="email"
                  placeholder="Email Address"
                  class="w-full bg-transparent text-white border-none focus:outline-none focus:ring-0 p-3 text-sm"
                />
                <button
                  @click="subscribe"
                  class="p-2 sm:p-3 text-white text-sm font-medium relative overflow-hidden"
                >
                  <span class="relative z-10 mr-3">Subscribe</span>
                  <span
                    class="absolute inset-0 bg-gradient-to-r from-vue-green via-laravel-red to-tailwind-blue opacity-80"
                  ></span>
                </button>
              </div>
            </div>
          </div>

          <p class="mt-3 sm:mt-4 text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
            I write about web development. I share what I'm working on and what I'm learning. No
            spam and unsubscribe at any time.
          </p>

          <!-- Tech icons -->
          <div class="flex justify-center mt-4 sm:mt-6 space-x-3 sm:space-x-4">
            <div class="h-5 w-5 sm:h-6 sm:w-6 text-vue-green">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                />
              </svg>
            </div>
            <div class="h-5 w-5 sm:h-6 sm:w-6 text-laravel-red">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                />
              </svg>
            </div>
            <div class="h-5 w-5 sm:h-6 sm:w-6 text-tailwind-blue">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../api'

export default {
  name: 'NewsletterSection',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async subscribe() {
      if (!this.email || !this.isValidEmail(this.email)) {
        alert('Please enter a valid email address')
        return
      }

      try {
        await api.post('/newsletter/subscribe', { email: this.email })
        alert('Subscribed successfully!')
        this.email = ''
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error)
        alert('Failed to subscribe. Please try again.')
      }
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
  },
}
</script>
