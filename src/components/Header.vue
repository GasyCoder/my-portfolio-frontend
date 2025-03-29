<template>
  <header class="pt-16 pb-8 relative">
    <!-- Éléments décoratifs techno -->
    <div class="absolute -top-10 right-20 opacity-10 w-20 h-20">
      <!-- Logo Vue.js -->
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 12.64L76.8 34.56H102.4L64 100.48L25.6 34.56H51.2L64 12.64Z" fill="#41B883" />
      </svg>
    </div>
    <div class="absolute left-10 top-10 opacity-10 w-20 h-20">
      <!-- Logo Laravel -->
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 120L20 40L108 40L64 120Z" stroke="#FF2D20" stroke-width="2" />
      </svg>
    </div>
    <div class="absolute left-40 top-32 opacity-10 w-16 h-16">
      <!-- Logo Tailwind simplifié -->
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="24" width="80" height="80" rx="10" fill="#38BDF8" />
      </svg>
    </div>

    <div class="portfolio-container">
      <div
        class="flex flex-col md:flex-row items-center md:items-center md:justify-between w-full relative"
      >
        <!-- Photo + Nom avec éléments des trois technologies -->
        <div class="flex items-center mb-8 md:mb-0 group">
          <div class="mr-5 relative">
            <!-- Bordure animée fusion des trois techno -->
            <div
              class="absolute inset-0 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-conic"
            ></div>

            <!-- Photo de profil avec bordure effet tech -->
            <div class="rounded-full p-0.5 border-tech-gradient">
              <img
                src="@/assets/images/me_1.png"
                alt="Profile Picture"
                class="w-32 h-32 rounded-full relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div class="transform transition-transform duration-500 group-hover:translate-x-2">
            <h1 class="text-3xl font-light tracking-wider uppercase relative">
              <router-link to="/" class="inline-block text-tech-gradient">
                BEZARA
                <span class="font-normal"> Florent </span>
              </router-link>
            </h1>

            <!-- Ligne tech fusion -->
            <div class="relative h-1 w-48 mt-2 rounded-full overflow-hidden">
              <div
                class="absolute inset-0 bg-gradient-to-r from-vue-green via-laravel-red to-tailwind-blue animate-gradient-x"
              ></div>
            </div>

            <!-- Tags technologies -->
            <div class="flex mt-2 space-x-2">
              <span class="tech-badge vue-badge">Vue.js</span>
              <span class="tech-badge laravel-badge">Laravel</span>
              <span class="tech-badge tailwind-badge">Tailwind</span>
            </div>
          </div>
        </div>

        <!-- Navigation moderne et minimaliste -->
        <nav class="relative">
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

<style scoped>
/* Animation lente de rotation pour l'effet de bordure */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

/* Animation de gradient qui bouge */
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

/* Gradient conique pour la bordure */
.bg-gradient-conic {
  background-image: conic-gradient(
    var(--vue-green),
    var(--laravel-red),
    var(--tailwind-blue),
    var(--vue-green)
  );
}

/* Classes tech */
.text-vue-green {
  color: var(--vue-green);
}

.text-laravel-red {
  color: var(--laravel-red);
}

.text-tailwind-blue {
  color: var(--tailwind-blue);
}

.bg-vue-green {
  background-color: var(--vue-green);
}

.bg-laravel-red {
  background-color: var(--laravel-red);
}

.bg-tailwind-blue {
  background-color: var(--tailwind-blue);
}

.border-tech-gradient {
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(
      to right,
      var(--vue-green),
      var(--laravel-red),
      var(--tailwind-blue)
    )
    1;
}

.text-tech-gradient {
  background: linear-gradient(to right, var(--vue-green), var(--laravel-red), var(--tailwind-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Styling du nav moderne */
.nav-link {
  font-weight: 500;
  letter-spacing: 0.05em;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.nav-link:hover {
  opacity: 1;
}

.nav-link.active {
  opacity: 1;
}

.nav-link:hover .nav-indicator {
  width: 100%;
}

.nav-link.active .nav-indicator {
  width: 100%;
}

.tech-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.7rem;
  border-radius: 9999px;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.tech-badge.vue-badge {
  background-color: rgba(65, 184, 131, 0.15);
  color: var(--vue-green);
  border: 1px solid rgba(65, 184, 131, 0.3);
}

.tech-badge.laravel-badge {
  background-color: rgba(255, 45, 32, 0.15);
  color: var(--laravel-red);
  border: 1px solid rgba(255, 45, 32, 0.3);
}

.tech-badge.tailwind-badge {
  background-color: rgba(56, 189, 248, 0.15);
  color: var(--tailwind-blue);
  border: 1px solid rgba(56, 189, 248, 0.3);
}
</style>
