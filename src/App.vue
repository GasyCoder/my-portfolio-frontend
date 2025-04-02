<template>
  <div id="app" class="bg-gradient-to-br from-laravel-dark via-vue-dark to-tailwind-blue/80">
    <!-- Éléments décoratifs de fond -->
    <div class="fixed top-0 left-0 z-0 w-full h-full overflow-hidden pointer-events-none">
      <!-- Logo Vue.js stylisé -->
      <div class="absolute top-10 right-10 opacity-10">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 16.6667L120 50H160L100 150L40 50H80L100 16.6667Z"
            fill="#41B883"
            fill-opacity="0.4"
          />
        </svg>
      </div>

      <!-- Logo Laravel stylisé -->
      <div class="absolute bottom-10 left-10 opacity-10">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.4583 158.333L100 16.6667L163.542 158.333H36.4583Z"
            stroke="#FF2D20"
            stroke-width="2"
            stroke-opacity="0.6"
          />
        </svg>
      </div>

      <!-- Logo Tailwind stylisé -->
      <div class="absolute top-1/2 left-1/3 opacity-10">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="50" y="50" width="100" height="100" rx="10" fill="#38BDF8" fill-opacity="0.4" />
        </svg>
      </div>

      <!-- Cercles décoratifs dans les couleurs des technologies -->
      <div
        class="absolute top-0 right-0 rounded-full w-96 h-96 bg-vue-green mix-blend-multiply filter blur-3xl opacity-5 animate-blob"
      ></div>
      <div
        class="absolute rounded-full top-1/3 -left-20 w-72 h-72 bg-laravel-red mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute bottom-0 rounded-full right-1/4 w-80 h-80 bg-tailwind-blue mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"
      ></div>
    </div>

    <!-- Contenu principal -->
    <div class="relative z-10">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>

    <!-- Barre de statut multitech -->
    <div
      class="fixed bottom-0 left-0 z-20 flex items-center justify-between w-full h-6 px-4 font-mono text-xs text-white bg-gray-900 opacity-95"
    >
      <div class="flex items-center space-x-2">
        <span class="inline-block w-2 h-2 mr-1 rounded-full bg-vue-green"></span>
        <span class="inline-block w-2 h-2 mr-1 rounded-full bg-laravel-red"></span>
        <span class="inline-block w-2 h-2 mr-1 rounded-full bg-tailwind-blue"></span>
        <span>@beflorent</span>
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-laravel-red">Laravel</span>
        <span class="text-livewire-pink">Livewire</span>
        <span class="text-vue-green">Vue.js</span>
        <span class="text-tailwind-blue">Tailwind</span>
      </div>
    </div>
  </div>
</template>

<style>
/* Styles globaux */
:root {
  /* Couleurs technologies */
  --vue-green: #41b883;
  --vue-dark: #34495e;
  --laravel-red: #ff2d20;
  --laravel-dark: #292929;
  --tailwind-blue: #38bdf8;
  --tailwind-dark: #0f172a;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: var(--font-sans);
  position: relative;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-jost);
  font-weight: var(--font-weight-light);
  color: white;
}

.container {
  width: 100%;
  max-width: 55rem;
  margin-left: auto;
  margin-right: auto;
}

/* Animations pour les éléments de fond */
.animate-blob {
  animation: blob 15s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Classes de couleurs tech */
.bg-vue-green {
  background-color: var(--vue-green);
}

.bg-laravel-red {
  background-color: var(--laravel-red);
}

.bg-tailwind-blue {
  background-color: var(--tailwind-blue);
}

.text-vue-green {
  color: var(--vue-green);
}

.text-laravel-red {
  color: var(--laravel-red);
}

.text-tailwind-blue {
  color: var(--tailwind-blue);
}

.from-vue-dark {
  --tw-gradient-from: var(--vue-dark);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(52, 73, 94, 0));
}

.from-laravel-dark {
  --tw-gradient-from: var(--laravel-dark);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(41, 41, 41, 0));
}

.via-vue-dark {
  --tw-gradient-stops:
    var(--tw-gradient-from), var(--vue-dark), var(--tw-gradient-to, rgba(52, 73, 94, 0));
}

.to-tailwind-blue {
  --tw-gradient-to: var(--tailwind-blue);
}

/* Transition d'entrée pour router-view */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Style de scrollbar personnalisé */
::-webkit-scrollbar {
  width: 8px;
  height: 0px;
}

::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(65, 184, 131, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(65, 184, 131, 0.5);
}
</style>
