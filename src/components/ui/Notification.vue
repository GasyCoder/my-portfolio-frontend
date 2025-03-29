<template>
  <Transition name="notification">
    <div
      v-if="visible"
      class="fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg backdrop-blur-lg transform transition-all duration-300"
      :class="[typeClasses]"
    >
      <div class="flex items-start">
        <!-- Icône selon le type -->
        <div class="flex-shrink-0">
          <!-- Icône de succès -->
          <svg
            v-if="type === 'success'"
            class="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <!-- Icône d'erreur -->
          <svg
            v-else-if="type === 'error'"
            class="w-5 h-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <!-- Icône d'info -->
          <svg
            v-else-if="type === 'info'"
            class="w-5 h-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <!-- Icône d'avertissement -->
          <svg
            v-else-if="type === 'warning'"
            class="w-5 h-5 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>

        <!-- Contenu -->
        <div class="ml-3 flex-1">
          <p class="text-sm">{{ message }}</p>
        </div>

        <!-- Bouton fermer -->
        <button
          type="button"
          class="ml-4 text-gray-400 hover:text-gray-200 focus:outline-none"
          @click="close"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Barre de progression qui se réduit avec le temps -->
      <div v-if="autoClose" class="mt-2 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
        <div
          class="bg-current h-full transition-all duration-100 ease-linear"
          :style="{ width: `${progressWidth}%` }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
    },
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 4000, // 4 secondes par défaut
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
      progressWidth: 100,
      progressInterval: null,
    }
  },
  computed: {
    typeClasses() {
      const classes = {
        success: 'bg-green-900/70 border border-green-600/30 text-green-100',
        error: 'bg-red-900/70 border border-red-600/30 text-red-100',
        warning: 'bg-yellow-900/70 border border-yellow-600/30 text-yellow-100',
        info: 'bg-blue-900/70 border border-blue-600/30 text-blue-100',
      }
      return classes[this.type] || classes.info
    },
  },
  watch: {
    type() {
      // Réinitialiser la notification si le type change
      this.resetNotification()
    },
    message() {
      // Réinitialiser la notification si le message change
      this.resetNotification()
    },
  },
  mounted() {
    this.show()
  },
  beforeUnmount() {
    clearInterval(this.progressInterval)
  },
  methods: {
    show() {
      this.visible = true

      if (this.autoClose) {
        this.startProgressBar()
      }
    },
    close() {
      this.visible = false
      clearInterval(this.progressInterval)
      this.$emit('close')
    },
    startProgressBar() {
      const updateFrequency = 100 // Mettre à jour toutes les 100ms
      const steps = this.duration / updateFrequency
      const decrement = 100 / steps

      this.progressWidth = 100

      clearInterval(this.progressInterval)
      this.progressInterval = setInterval(() => {
        this.progressWidth -= decrement
        if (this.progressWidth <= 0) {
          this.close()
        }
      }, updateFrequency)
    },
    resetNotification() {
      clearInterval(this.progressInterval)
      this.progressWidth = 100
      this.show()
    },
  },
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
