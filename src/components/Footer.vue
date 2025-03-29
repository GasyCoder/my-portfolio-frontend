<template>
  <footer class="pb-12 relative">
    <div class="portfolio-container">
      <div class="text-center relative z-10">
        <!-- Logo fusion technologique -->
        <div class="flex justify-center mb-4">
          <div class="relative h-8 w-24">
            <!-- Vue logo -->
            <div class="absolute top-0 left-0 h-8 w-8 opacity-60">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.4 6.5H19.2L12 18.4L4.8 6.5H9.6L12 2Z" fill="#41B883" />
              </svg>
            </div>
            <!-- Laravel logo -->
            <div class="absolute top-0 left-8 h-8 w-8 opacity-60">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.7L3.7 7.7L20.3 7.7L12 21.7Z" stroke="#FF2D20" stroke-width="1.5" />
              </svg>
            </div>
            <!-- Tailwind logo -->
            <div class="absolute top-0 left-16 h-8 w-8 opacity-60">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" fill="#38BDF8" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Copyright texte with tech gradient -->
        <p class="text-color-text-medium text-sm">
          © {{ new Date().getFullYear() }} Bezara Florent. Built with
          <span class="text-laravel-red">Laravel</span>,
          <span class="text-vue-green">Vue.js</span> &
          <span class="text-tailwind-blue">Tailwind CSS</span>
        </p>

        <!-- Links -->
        <div class="flex justify-center mt-4 space-x-4">
          <a href="#" class="text-gray-400 hover:text-laravel-red transition-colors">
            <span class="text-xs">API</span>
          </a>
          <a href="#" class="text-gray-400 hover:text-vue-green transition-colors">
            <span class="text-xs">Source</span>
          </a>
          <a href="#" class="text-gray-400 hover:text-tailwind-blue transition-colors">
            <span class="text-xs">Credits</span>
          </a>
        </div>

        <!-- Custom bar -->
        <div class="mt-5 h-1 w-24 mx-auto rounded-full overflow-hidden">
          <div
            class="h-full w-full bg-gradient-to-r from-vue-green via-laravel-red to-tailwind-blue animate-gradient-x"
          ></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
@keyframes gradient-x {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
  background-size: 200% 200%;
}
</style>
