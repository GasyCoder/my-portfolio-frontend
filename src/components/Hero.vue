<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <div class="card-hero p-5 sm:p-6 md:p-8 backdrop-blur-md">
        <div
          class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <!-- Emoji avec cercle coloré - centré sur mobile -->
          <div class="shrink-0 relative">
            <span class="text-3xl md:text-4xl z-10 relative">👨‍💻</span>
            <span
              class="absolute -inset-1 rounded-full bg-gradient-to-r from-vue-green via-laravel-red to-tailwind-blue opacity-20 blur-sm"
            ></span>
          </div>

          <!-- Contenu principal - centré sur mobile, aligné à gauche sur desktop -->
          <div class="text-center sm:text-left">
            <h2 class="text-2xl sm:text-3xl font-bold text-tech-gradient">
              Web & Software Developer
            </h2>

            <!-- Technologies - Flexbox réactif avec marges adaptives -->
            <p class="mt-3 sm:mt-4 text-color-text-medium text-sm sm:text-base">
              I build websites & apps with
              <span class="relative mx-1 inline-block">
                <a href="#" class="text-laravel-red hover:text-laravel-red/80 transition-colors"
                  >Laravel</a
                >
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-laravel-red"></span> </span
              >,
              <span class="relative mx-1 inline-block">
                <a href="#" class="text-vue-green hover:text-vue-green/80 transition-colors">Vue</a>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-vue-green"></span>
              </span>
              &
              <span class="relative mx-1 inline-block">
                <a href="#" class="text-tailwind-blue hover:text-tailwind-blue/80 transition-colors"
                  >Tailwind</a
                >
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-tailwind-blue"></span> </span
              >.
            </p>

            <!-- Description - Taille de texte adaptative -->
            <p class="mt-2 text-color-text-medium text-sm sm:text-base">
              🚀 Software Artisan | Laravel & TALL Stack Specialist | Crafting Next-Gen AI Solutions
              ⚙️
            </p>

            <!-- Liens sociaux - Espacement adaptatif -->
            <p class="mt-3 sm:mt-4 text-color-text-medium text-sm sm:text-base">
              Find me on
              <a
                href="#"
                class="text-vue-green hover:text-vue-green/80 transition-colors underline-offset-2 hover:underline"
                >X.com</a
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
                >LinkdIn</a
              >.
            </p>

            <!-- Badges tech - Flex wrap avec espacement adaptatif -->
            <div
              class="flex flex-wrap justify-center sm:justify-start mt-4 sm:mt-6 gap-1.5 sm:gap-2"
            >
              <span class="tech-badge vue-badge">Vue.js</span>
              <span class="tech-badge laravel-badge">Laravel</span>
              <span class="tech-badge tailwind-badge">Tailwind CSS</span>
              <span class="tech-badge react-badge">ReactJS</span>
              <span class="tech-badge js-badge">JavaScript</span>
              <span class="tech-badge ts-badge">TypeScript</span>
              <span class="tech-badge php-badge">PHP</span>
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
