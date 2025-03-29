<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <div class="card p-8 backdrop-blur-md">
        <div class="flex items-start space-x-4">
          <div class="shrink-0 relative">
            <!-- Emoji avec cercle coloré -->
            <span class="text-3xl z-10 relative">👨‍💻</span>
            <span
              class="absolute -inset-1 rounded-full bg-gradient-to-r from-vue-green via-laravel-red to-tailwind-blue opacity-20 blur-sm"
            ></span>
          </div>
          <div>
            <h2 class="text-3xl font-bold text-tech-gradient">Web & Software Developer</h2>
            <p class="mt-4 text-color-text-medium">
              I build websites & apps with
              <span class="relative mx-1">
                <a href="#" class="text-laravel-red hover:text-laravel-red/80 transition-colors"
                  >Laravel</a
                >
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-laravel-red"></span> </span
              >,
              <span class="relative mx-1">
                <a href="#" class="text-vue-green hover:text-vue-green/80 transition-colors">Vue</a>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-vue-green"></span>
              </span>
              &
              <span class="relative mx-1">
                <a href="#" class="text-tailwind-blue hover:text-tailwind-blue/80 transition-colors"
                  >Tailwind</a
                >
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-tailwind-blue"></span> </span
              >.
            </p>
            <p class="mt-2 text-color-text-medium">
              🚀 Software Artisan | Laravel & TALL Stack Specialist | Crafting Next-Gen AI Solutions
              ⚙️
            </p>
            <p class="mt-4 text-color-text-medium">
              Find me on
              <a
                href="#"
                class="text-vue-green hover:text-vue-green/80 transition-colors underline-offset-2 hover:underline"
                >Twitter</a
              >,
              <a
                href="#"
                class="text-laravel-red hover:text-laravel-red/80 transition-colors underline-offset-2 hover:underline"
                >GitHub</a
              >
              &
              <a
                href="#"
                class="text-tailwind-blue hover:text-tailwind-blue/80 transition-colors underline-offset-2 hover:underline"
                >Instagram</a
              >.
            </p>

            <!-- Badges tech -->
            <div class="flex flex-wrap mt-6 gap-2">
              <span class="tech-badge vue-badge">Vue.js</span>
              <span class="tech-badge laravel-badge">Laravel</span>
              <span class="tech-badge tailwind-badge">Tailwind CSS</span>
              <span class="tech-badge react-badge">ReactJS</span>
              <span class="tech-badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                JavaScript
              </span>
              <span class="tech-badge bg-blue-600/20 text-blue-500 border border-blue-600/30">
                TypeScript
              </span>
              <span class="tech-badge bg-purple-600/20 text-purple-400 border border-purple-600/30">
                PHP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
}
</script>
