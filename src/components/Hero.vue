<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <div
        class="card-hero p-5 sm:p-6 backdrop-blur-md rounded-lg border border-gray-700/30 relative"
      >
        <!-- Bouton "Start a project" déplacé en haut à droite -->
        <div class="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
          <router-link
            to="/contact"
            class="inline-flex items-center px-3 py-1.5 text-sm rounded border border-gray-600 hover:border-tailwind-blue text-gray-300 hover:text-white transition-colors bg-gray-800/50"
          >
            Contact me
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </router-link>
        </div>

        <div
          class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <!-- Emoji avec cercle coloré - centré sur mobile -->
          <div class="shrink-0 relative">
            <span class="text-3xl z-10 relative">👨‍💻</span>
            <span
              class="absolute -inset-1 rounded-full bg-gradient-to-r from-vue-green via-laravel-red to-tailwind-blue opacity-20 blur-sm"
            ></span>
          </div>

          <!-- Contenu principal - centré sur mobile, aligné à gauche sur desktop -->
          <div class="text-center sm:text-left">
            <h2 class="text-2xl sm:text-3xl font-bold">
              <span class="text-tech-gradient">Crafting Digital Excellence</span>
            </h2>

            <!-- Technologies - Flexbox réactif avec marges adaptives -->
            <!-- <p class="mt-2 text-color-text-medium text-sm sm:text-base">
              Delivering powerful web solutions with
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
            </p> -->

            <!-- Description - Taille de texte adaptative -->
            <p class="mt-2 text-color-text-medium text-sm sm:text-base">
              🚀 Full-Stack Expert | Solving Complex Challenges | Turning Vision into Reality ⚙️
            </p>

            <!-- Liens sociaux - Espacement adaptatif -->
            <p class="mt-3 text-color-text-medium text-sm sm:text-base">
              Connect with me on
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
                >LinkedIn</a
              >.
            </p>

            <!-- Badges tech - Flex wrap avec espacement adaptatif -->
            <div class="flex flex-wrap justify-center sm:justify-start mt-3 sm:mt-4 gap-1.5">
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

<style scoped>
.tech-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 500;
}

.vue-badge {
  background-color: rgba(65, 184, 131, 0.15);
  color: #41b883;
  border: 1px solid rgba(65, 184, 131, 0.3);
}

.laravel-badge {
  background-color: rgba(255, 45, 32, 0.15);
  color: #ff2d20;
  border: 1px solid rgba(255, 45, 32, 0.3);
}

.tailwind-badge {
  background-color: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.react-badge {
  background-color: rgba(97, 218, 251, 0.15);
  color: #61dafb;
  border: 1px solid rgba(97, 218, 251, 0.3);
}

.js-badge {
  background-color: rgba(247, 223, 30, 0.15);
  color: #f7df1e;
  border: 1px solid rgba(247, 223, 30, 0.3);
}

.ts-badge {
  background-color: rgba(49, 120, 198, 0.15);
  color: #3178c6;
  border: 1px solid rgba(49, 120, 198, 0.3);
}

.php-badge {
  background-color: rgba(119, 123, 179, 0.15);
  color: #777bb3;
  border: 1px solid rgba(119, 123, 179, 0.3);
}

.card-hero {
  background-color: rgba(31, 41, 55, 0.5);
  border-radius: 0.5rem;
  backdrop-filter: blur(4px);
}

.text-tech-gradient {
  background: linear-gradient(to right, #41b883, #ff2d20, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
