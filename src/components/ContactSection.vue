<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <h3 class="section-title">Contact</h3>
      <!-- Utilisation du composant AppLoader -->
      <AppLoader v-if="isLoading" message="Loading contact..." />
      <!-- Utilisation du composant AppError -->
      <AppError v-else-if="error" :message="error" />
      <div v-else class="space-y-5">
        <div>
          <!-- works list -->
          <p class="text-gray-600">This section will contain your contact form or information.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppLoader from '@/components/ui/AppLoader.vue'
import AppError from '@/components/ui/AppError.vue'

export default {
  name: 'ContactSection',
  components: {
    AppLoader,
    AppError,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
}
</script>
