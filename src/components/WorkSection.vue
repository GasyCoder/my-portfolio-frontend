<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <h3 class="section-title">Works</h3>
      <!-- Utilisation du composant AppLoader -->
      <AppLoader v-if="isLoading" message="Loading work items..." />
      <!-- Utilisation du composant AppError -->
      <AppError v-else-if="error" :message="error" />
      <div v-else class="space-y-5">
        <div>
          <!-- works list -->
          <p>List of my works here</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppLoader from '@/components/ui/AppLoader.vue'
import AppError from '@/components/ui/AppError.vue'

export default {
  name: 'WorkSection',
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
