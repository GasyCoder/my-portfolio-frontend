<template>
  <section class="mb-12">
    <div class="portfolio-container">
      <h3 class="section-title">Open Source Work</h3>

      <!-- Utilisation du composant AppLoader -->
      <AppLoader v-if="isLoading" message="Loading projects..." />
      <!-- Utilisation du composant AppError -->
      <AppError v-else-if="error" :message="error" />

      <!-- Grille de projets -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="project in specificProjects"
          :key="project.id"
          class="card fade-in-up hover:shadow-lg transition-all duration-300"
          :style="{ animationDelay: `${project.id * 0.1}s` }"
        >
          <!-- Project Header avec style tech -->
          <div class="flex items-center space-x-2 mb-3">
            <div
              class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-gray-700"
            >
              <img :src="project.owner.avatar_url" alt="Profile" class="w-8 h-8" />
            </div>
            <p class="text-color-text-light text-sm">
              <span class="font-semibold text-tech-gradient">{{ project.owner.login }}</span>
              <span class="text-gray-400"> / </span>
              <span class="font-medium">{{ project.name }}</span>
            </p>
          </div>

          <!-- Description -->
          <p class="text-color-text-medium text-sm min-h-[60px] mb-4 line-clamp-3">
            {{ project.description || 'No description available' }}
          </p>

          <!-- Langages et statistiques -->
          <div class="flex flex-wrap justify-between items-center mt-3">
            <div class="flex flex-wrap gap-2">
              <span
                v-if="project.language"
                class="tech-badge text-xs px-2 py-1 rounded-md"
                :class="getTechBadgeClass(project.language)"
              >
                {{ project.language }}
              </span>

              <span
                v-if="project.stars"
                class="tech-badge text-xs px-2 py-1 rounded-md bg-gray-700/30 text-gray-300 border border-gray-600 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-3 h-3 mr-1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ project.stars }}
              </span>
            </div>
          </div>

          <!-- Action button -->
          <div class="mt-5 pt-3 border-t border-gray-700">
            <a
              :href="project.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn text-xs inline-flex items-center justify-center w-full py-2 rounded-md transition-all duration-300 hover:opacity-90"
              :class="getButtonClass(project.language)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              View Repository
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppError from '@/components/ui/AppError.vue'

export default {
  name: 'CodeSection',
  components: {
    AppLoader,
    AppError,
  },
  data() {
    return {
      allProjects: [],
      specificProjects: [],
      isLoading: true,
      error: null,
      specificRepoNames: [
        'bacc-examen-officiel-2024',
        'online-formation',
        'input-email-validation',
      ],
    }
  },
  async created() {
    await this.fetchProjects()
  },
  methods: {
    async fetchProjects() {
      try {
        this.isLoading = true

        // Récupérer tous les dépôts de l'utilisateur
        const response = await axios.get('https://api.github.com/users/GasyCoder/repos', {
          params: {
            per_page: 100, // Obtenir un maximum de dépôts
          },
        })

        // Filtrer pour obtenir les dépôts spécifiques demandés
        this.allProjects = response.data

        // Trouver les dépôts spécifiques
        const foundRepos = []
        for (const repoName of this.specificRepoNames) {
          const repo = this.allProjects.find((r) => r.name === repoName)
          if (repo) {
            foundRepos.push(repo)
          }
        }

        // Formatage des dépôts pour l'affichage
        this.specificProjects = foundRepos.map((repo, index) => ({
          ...repo,
          id: index + 1,
          stars: repo.stargazers_count,
          isForked: repo.fork,
          owner: repo.owner || {
            login: 'GasyCoder',
            avatar_url: 'https://avatars.githubusercontent.com/u/21291821?v=4',
          },
        }))

        // Si des dépôts n'ont pas été trouvés, afficher un message
        if (foundRepos.length < this.specificRepoNames.length) {
          console.warn(
            `Certains dépôts n'ont pas été trouvés: ${this.specificRepoNames
              .filter((name) => !foundRepos.some((repo) => repo.name === name))
              .join(', ')}`,
          )
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des dépôts GitHub:', error)
        this.error = 'Impossible de charger les projets. Veuillez réessayer plus tard.'

        // Données de secours pour les repos spécifiques
        this.specificProjects = [
          {
            id: 1,
            name: 'bacc-examen-officiel-2024',
            description:
              'Une application qui aide les étudiants à préparer leur examen du baccalauréat avec des exercices officiels de 2024.',
            language: 'PHP',
            html_url: 'https://github.com/GasyCoder/bacc-examen-officiel-2024',
            stars: 2,
            isForked: false,
            owner: {
              login: 'GasyCoder',
              avatar_url: 'https://avatars.githubusercontent.com/u/21291821?v=4',
            },
          },
          {
            id: 2,
            name: 'online-formation',
            description:
              'Plateforme de formation en ligne avec gestion des cours, des étudiants et des paiements.',
            language: 'JavaScript',
            html_url: 'https://github.com/GasyCoder/online-formation',
            stars: 3,
            isForked: false,
            owner: {
              login: 'GasyCoder',
              avatar_url: 'https://avatars.githubusercontent.com/u/21291821?v=4',
            },
          },
          {
            id: 3,
            name: 'input-email-validation',
            description:
              "Un composant de validation d'email en temps réel avec feedback visuel pour les utilisateurs.",
            language: 'HTML',
            html_url: 'https://github.com/GasyCoder/input-email-validation',
            stars: 1,
            isForked: false,
            owner: {
              login: 'GasyCoder',
              avatar_url: 'https://avatars.githubusercontent.com/u/21291821?v=4',
            },
          },
        ]
      } finally {
        this.isLoading = false
      }
    },

    getTechBadgeClass(language) {
      if (!language) return 'bg-gray-700/30 text-gray-300 border border-gray-600'

      const techClasses = {
        Laravel: 'laravel-badge',
        Vue: 'vue-badge',
        Tailwind: 'tailwind-badge',
        TailwindCSS: 'tailwind-badge',
        'Tailwind CSS': 'tailwind-badge',
        PHP: 'laravel-badge', // PHP utilise la même couleur que Laravel
        JavaScript: 'bg-yellow-500/20 text-yellow-300 border border-yellow-600/30',
        TypeScript: 'bg-blue-500/20 text-blue-300 border border-blue-600/30',
        Python: 'bg-green-500/20 text-green-300 border border-green-600/30',
        HTML: 'bg-orange-500/20 text-orange-300 border border-orange-600/30',
        CSS: 'tailwind-badge', // CSS utilise la même couleur que Tailwind
      }

      return techClasses[language] || 'bg-gray-700/30 text-gray-300 border border-gray-600'
    },

    getButtonClass(language) {
      if (!language) return 'bg-gray-700 hover:bg-gray-600 text-white'

      const buttonClasses = {
        Laravel: 'bg-red-700/80 hover:bg-red-600/80 text-white border-red-500/30',
        PHP: 'bg-red-700/80 hover:bg-red-600/80 text-white border-red-500/30',
        Vue: 'bg-green-700/80 hover:bg-green-600/80 text-white border-green-500/30',
        JavaScript: 'bg-yellow-700/80 hover:bg-yellow-600/80 text-white border-yellow-500/30',
        TypeScript: 'bg-blue-700/80 hover:bg-blue-600/80 text-white border-blue-500/30',
        Python: 'bg-green-800/80 hover:bg-green-700/80 text-white border-green-500/30',
        HTML: 'bg-orange-700/80 hover:bg-orange-600/80 text-white border-orange-500/30',
        CSS: 'bg-blue-700/80 hover:bg-blue-600/80 text-white border-blue-500/30',
        Tailwind: 'bg-blue-700/80 hover:bg-blue-600/80 text-white border-blue-500/30',
      }

      return buttonClasses[language] || 'bg-gray-700 hover:bg-gray-600 text-white'
    },
  },
}
</script>
