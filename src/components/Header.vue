<template>
  <header class="pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 relative">
    <!-- Éléments décoratifs techno - ajusté pour mobile -->
    <div
      class="absolute -top-10 right-10 sm:right-20 opacity-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 hidden sm:block"
    >
      <!-- Logo Vue.js -->
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 12.64L76.8 34.56H102.4L64 100.48L25.6 34.56H51.2L64 12.64Z" fill="#41B883" />
      </svg>
    </div>
    <div
      class="absolute left-5 sm:left-10 top-5 sm:top-10 opacity-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 hidden sm:block"
    >
      <!-- Logo Laravel -->
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 120L20 40L108 40L64 120Z" stroke="#FF2D20" stroke-width="2" />
      </svg>
    </div>
    <div
      class="absolute left-24 sm:left-32 md:left-40 top-20 sm:top-24 md:top-32 opacity-10 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 hidden sm:block"
    >
      <!-- Logo Tailwind simplifié -->
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="24" width="80" height="80" rx="10" fill="#38BDF8" />
      </svg>
    </div>

    <div class="portfolio-container">
      <!-- Structure flex qui redevient row sur desktop -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between w-full relative">
        <!-- Photo + Nom avec éléments des trois technologies -->
        <div
          class="flex flex-col sm:flex-row items-center md:items-start md:flex-row mb-8 md:mb-0 group"
        >
          <div class="mb-4 sm:mb-0 sm:mr-5 relative">
            <!-- Bordure animée fusion des trois techno -->
            <div
              class="absolute inset-0 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-conic"
            ></div>

            <!-- Photo de profil avec bordure effet tech -->
            <div class="rounded-full p-0.5 border-tech-gradient">
              <img
                src="@/assets/images/me_1.png"
                alt="Profile Picture"
                class="w-28 h-28 sm:w-28 md:w-32 sm:h-28 md:h-32 rounded-full relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div
            class="transform transition-transform duration-500 text-center sm:text-left group-hover:sm:translate-x-2"
          >
            <h1
              class="text-2xl sm:text-2xl md:text-3xl font-light tracking-wider uppercase relative"
            >
              <router-link to="/" class="inline-block text-tech-gradient">
                BEZARA
                <span class="font-normal"> Florent </span>
              </router-link>
            </h1>

            <!-- Ligne tech fusion -->
            <div
              class="relative h-1 w-36 sm:w-40 md:w-48 mt-2 mx-auto sm:mx-0 rounded-full overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-vue-green via-laravel-red to-tailwind-blue animate-gradient-x"
              ></div>
            </div>

            <!-- Tags technologies -->
            <div class="flex justify-center sm:justify-start mt-2 space-x-2">
              <span class="tech-badge vue-badge">Vue.js</span>
              <span class="tech-badge laravel-badge">Laravel</span>
              <span class="tech-badge tailwind-badge">Tailwind</span>
            </div>
          </div>
        </div>

        <!-- Navigation mobile - Tab style avec défilement horizontal -->
        <div class="w-full mt-4 md:hidden">
          <div class="overflow-x-auto hide-scrollbar pb-1">
            <ul
              class="flex space-x-6 text-color-text-light text-xs uppercase tracking-wider font-medium whitespace-nowrap min-w-max px-1"
            >
              <li v-for="(item, index) in navItems" :key="index" class="relative">
                <router-link
                  :to="item.path"
                  class="nav-link relative px-1 py-2 inline-block transition-all duration-300"
                  :class="{ active: $route.path === item.path }"
                >
                  {{ item.name }}
                  <div
                    class="nav-indicator absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 ease-out"
                    :class="getNavIndicatorClass(item.path)"
                  ></div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Navigation desktop original -->
        <nav class="relative hidden md:block">
          <ul
            class="flex space-x-8 text-color-text-light text-sm uppercase tracking-wider font-medium"
          >
            <li v-for="(item, index) in navItems" :key="index" class="relative">
              <router-link
                :to="item.path"
                class="nav-link relative px-1 py-2 inline-block transition-all duration-300"
                :class="{ active: $route.path === item.path }"
              >
                {{ item.name }}
                <div
                  class="nav-indicator absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 ease-out"
                  :class="getNavIndicatorClass(item.path)"
                ></div>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      navItems: [
        { name: 'Projects', path: '/projects' },
        { name: 'Work', path: '/work' },
        { name: 'Articles', path: '/articles' },
        { name: 'Contact', path: '/contact' },
      ],
    }
  },
  methods: {
    getNavIndicatorClass(path) {
      // Déterminer quelle technologie utiliser pour l'indicateur sous le lien
      switch (path) {
        case '/projects':
          return 'bg-vue-green'
        case '/work':
          return 'bg-laravel-red'
        case '/articles':
          return 'bg-tailwind-blue'
        case '/contact':
          return 'bg-white'
        default:
          return 'bg-vue-green'
      }
    },
  },
}
</script>
