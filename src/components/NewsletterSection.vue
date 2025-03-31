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
        <div class="relative z-10 p-4 text-center sm:p-6 md:p-8">
          <div
            class="inline-flex items-center px-2 py-1 mb-2 rounded-full sm:px-3 bg-gray-800/50 backdrop-blur-sm"
          >
            <span class="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-vue-green mr-1"></span>
            <span class="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-laravel-red mr-1"></span>
            <span class="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-tailwind-blue mr-1"></span>
            <p class="text-xs font-medium tracking-wider text-gray-300 uppercase">Newsletter</p>
          </div>

          <h2 class="mt-2 text-xl font-bold sm:text-2xl text-tech-gradient">Stay Up To Date</h2>
          <p class="mt-1 text-sm text-gray-300 sm:mt-2 sm:text-base">Laravel, Vue & Tailwind CSS</p>

          <!-- Message de succès -->
          <div v-if="subscriptionSuccess" class="mt-4 sm:mt-6 animate-fade-in">
            <div class="p-3 text-green-300 border rounded-md bg-green-900/50 border-green-500/30">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>{{ subscriptionMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Form avec gradient border - responsive pour mobile -->
          <div v-if="!subscriptionSuccess" class="flex justify-center mt-4 sm:mt-6">
            <div
              class="p-0.5 rounded-md bg-gradient-to-r from-vue-green via-laravel-red to-tailwind-blue inline-flex w-full max-w-xs sm:max-w-md"
              :class="{ 'opacity-75': isSubmitting }"
            >
              <div class="flex flex-col w-full bg-gray-900 rounded-md sm:flex-row">
                <input
                  v-model="email"
                  type="email"
                  placeholder="Email Address"
                  class="w-full p-3 text-sm text-white bg-transparent border-none focus:outline-none focus:ring-0"
                  :class="{ 'border-red-500 focus:border-red-500': validationError }"
                  :disabled="isSubmitting"
                  @keydown.enter="subscribe"
                />
                <button
                  @click="subscribe"
                  class="relative p-2 overflow-hidden text-sm font-medium text-white sm:p-3"
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting" class="relative z-10 mr-3">Subscribe</span>
                  <span v-else class="relative z-10 flex items-center mr-3">
                    <svg
                      class="w-4 h-4 mr-1 animate-spin"
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
                    Submitting...
                  </span>
                  <span
                    class="absolute inset-0 bg-gradient-to-r from-vue-green via-laravel-red to-tailwind-blue opacity-80"
                  ></span>
                </button>
              </div>
            </div>
          </div>

          <!-- Message d'erreur -->
          <div
            v-if="validationError && !subscriptionSuccess"
            class="mt-2 text-xs text-red-400 sm:text-sm"
          >
            {{ validationError }}
          </div>

          <p class="max-w-md mx-auto mt-3 text-xs text-gray-400 sm:mt-4 sm:text-sm">
            I write about web development. I share what I'm working on and what I'm learning. No
            spam and unsubscribe at any time.
          </p>

          <!-- Tech icons -->
          <div class="flex justify-center mt-4 space-x-3 sm:mt-6 sm:space-x-4">
            <div class="w-5 h-5 sm:h-6 sm:w-6 text-vue-green">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                />
              </svg>
            </div>
            <div class="w-5 h-5 sm:h-6 sm:w-6 text-laravel-red">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                />
              </svg>
            </div>
            <div class="w-5 h-5 sm:h-6 sm:w-6 text-tailwind-blue">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <Notification
        v-if="showNotification"
        :type="notificationType"
        :message="notificationMessage"
        @close="closeNotification"
      />
    </div>
  </section>
</template>

<script>
import api from '../api'
import Notification from '@/components/ui/Notification.vue'
export default {
  name: 'NewsletterSection',
  components: {
    Notification,
  },
  data() {
    return {
      email: '',
      isSubmitting: false,
      subscriptionSuccess: false,
      subscriptionMessage: '',
      validationError: '',

      // Notification properties
      showNotification: false,
      notificationMessage: '',
      notificationProgress: 100,
      notificationTimer: null,
    }
  },
  methods: {
    async subscribe() {
      this.validationError = ''

      if (!this.email || !this.isValidEmail(this.email)) {
        this.validationError = 'Veuillez entrer une adresse email valide'
        return
      }

      try {
        this.isSubmitting = true

        // Appel à l'API pour l'inscription
        const response = await api.post('/newsletter/subscribe', { email: this.email })

        if (response.data && response.data.success) {
          // this.subscriptionSuccess = true
          // this.subscriptionMessage =
          //   response.data.message ||
          //   'Vous êtes maintenant pré-inscrit à la newsletter ! Veuillez vérifier votre email pour confirmer votre inscription.'
          this.email = ''

          // Afficher une notification
          this.showNotificationMessage(
            'Un email de confirmation a été envoyé à votre adresse email.',
          )
        } else {
          throw new Error('Réponse inattendue du serveur')
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error)

        if (error.response && error.response.status === 422) {
          this.validationError =
            error.response.data.message || 'Cette adresse email est déjà inscrite ou invalide.'
        } else {
          this.validationError =
            "Impossible de s'inscrire pour le moment. Veuillez réessayer ultérieurement."
        }
      } finally {
        this.isSubmitting = false
      }
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    // Notification methods
    showNotificationMessage(message) {
      // Clear any existing notification timer
      if (this.notificationTimer) {
        clearInterval(this.notificationTimer)
        this.notificationTimer = null
      }

      // Set notification message and show
      this.notificationMessage = message
      this.showNotification = true
      this.notificationProgress = 100

      // Start the progress bar countdown
      const duration = 4000 // 4 seconds
      const updateFrequency = 100 // Update every 100ms
      const decrement = 100 / (duration / updateFrequency)

      this.notificationTimer = setInterval(() => {
        this.notificationProgress -= decrement

        if (this.notificationProgress <= 0) {
          this.closeNotification()
        }
      }, updateFrequency)

      // Auto close after duration
      setTimeout(() => {
        this.closeNotification()
      }, duration)
    },

    closeNotification() {
      this.showNotification = false

      if (this.notificationTimer) {
        clearInterval(this.notificationTimer)
        this.notificationTimer = null
      }
    },
  },
  // Clean up any timers when component is destroyed
  beforeUnmount() {
    if (this.notificationTimer) {
      clearInterval(this.notificationTimer)
    }
  },
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
