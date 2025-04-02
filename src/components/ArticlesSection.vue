<template>
  <div>
    <section class="mb-12">
      <div class="portfolio-container">
        <!-- En-tête avec titre et barre de recherche -->
        <div
          class="flex flex-col items-start justify-between gap-4 mb-3 md:flex-row md:items-center"
        >
          <h3 class="mb-0 section-title">Articles</h3>

          <!-- Barre de recherche -->
          <div class="relative w-full md:w-auto">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full py-2 pl-10 pr-4 text-sm border border-gray-700 rounded-full bg-gray-800/40 md:w-64 text-color-text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              @input="handleSearch"
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Utilisation du composant AppLoader -->
        <AppLoader v-if="isLoading" message="Chargement des articles..." />

        <!-- Utilisation du composant AppError -->
        <AppError v-else-if="error" :message="error" />

        <!-- Liste des articles -->
        <div v-else class="space-y-5">
          <div
            v-for="(article, index) in paginatedArticles"
            :key="article.id"
            class="p-6 transition-all duration-300 card fade-in-up hover:shadow-lg"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Titre + badge de technologie -->
            <div class="flex flex-wrap items-start justify-between">
              <h4 class="flex-1 text-lg font-semibold text-color-text-light">
                {{ article.title }}
              </h4>
              <span
                class="mt-1 ml-2 text-xs tech-badge"
                :class="getCategoryBadgeClass(article.category)"
              >
                {{ article.category }}
              </span>
            </div>

            <!-- Métadonnées -->
            <div class="flex items-center mt-2">
              <p class="text-xs text-color-text-medium">
                {{ formatDate(article.published_at) }} • {{ article.read_time }} minute read
              </p>
            </div>

            <!-- Description si elle existe, sinon contenu avec effet de gradient subtil sur le texte -->
            <div 
              v-if="article.description" 
              class="mt-3 leading-relaxed text-color-text-medium line-clamp-3 prose-preview"
              v-html="renderContent(article.description)"
            ></div>
            <div 
              v-else
              class="mt-3 leading-relaxed text-color-text-medium line-clamp-3 prose-preview"
              v-html="renderContent(article.content)"
            ></div>

            <!-- Bouton de lecture -->
            <div class="pt-3 mt-4 border-t border-gray-700">
              <router-link
                :to="`/articles/${article.slug}`"
                class="inline-flex items-center px-4 py-2 text-sm transition-all duration-300 rounded-md btn hover:opacity-90"
                :class="getArticleButtonClass(article.category)"
              >
                Read Article
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 ml-1"
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
              </router-link>
            </div>
          </div>

          <!-- Message si aucun article -->
          <div v-if="filteredArticles.length === 0" class="py-8 text-center text-color-text-medium">
            Aucun article disponible correspondant à votre recherche.
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="!isLoading && !error && filteredArticles.length > 0"
          class="flex justify-center mt-8"
        >
          <div class="flex items-center space-x-2">
            <!-- Bouton page précédente -->
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="flex items-center justify-center w-10 h-10 transition-colors border border-gray-700 rounded-full text-color-text-light disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800/40"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <!-- Numéros de page -->
            <div
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              class="flex items-center justify-center w-10 h-10 transition-colors rounded-full cursor-pointer"
              :class="
                page === currentPage
                  ? 'bg-gray-700 text-white'
                  : 'text-color-text-light hover:bg-gray-800/40'
              "
            >
              {{ page }}
            </div>

            <!-- Bouton page suivante -->
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="flex items-center justify-center w-10 h-10 transition-colors border border-gray-700 rounded-full text-color-text-light disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800/40"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
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
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../api' // Assure-toi que ce fichier est configuré pour appeler ton API Laravel
import articlesData from '../data/articles.json' // Importe le JSON comme fallback
import AppLoader from '@/components/ui/AppLoader.vue'
import AppError from '@/components/ui/AppError.vue'
import { marked } from 'marked' // Importez marked pour le support markdown

export default {
  name: 'ArticlesSection',
  components: {
    AppLoader,
    AppError,
  },
  data() {
    return {
      isLoading: true,
      error: null,
      articles: [], // Initialement vide, sera rempli par l'API ou le JSON
      searchQuery: '',
      currentPage: 1,
      articlesPerPage: 3,
    }
  },
  computed: {
    filteredArticles() {
      if (!this.searchQuery) {
        return this.articles
      }

      const query = this.searchQuery.toLowerCase()
      return this.articles.filter((article) => {
        const contentText = this.stripHtml(article.content || '').toLowerCase()
        const descriptionText = this.stripHtml(article.description || '').toLowerCase()
        return (
          article.title.toLowerCase().includes(query) ||
          contentText.includes(query) ||
          descriptionText.includes(query) ||
          (article.category || '').toLowerCase().includes(query) ||
          (article.tags ? article.tags.some(tag => tag.toLowerCase().includes(query)) : false)
        )
      })
    },
    totalPages() {
      return Math.ceil(this.filteredArticles.length / this.articlesPerPage)
    },
    paginatedArticles() {
      const startIndex = (this.currentPage - 1) * this.articlesPerPage
      const endIndex = startIndex + this.articlesPerPage
      return this.filteredArticles.slice(startIndex, endIndex)
    },
  },
  async created() {
    await this.fetchArticles() // Charge les articles au montage du composant
  },
  methods: {
    // Détecter si un contenu est en Markdown
    isMarkdown(content) {
      if (!content) return false;
      
      // Détecter les motifs markdown courants
      const markdownPatterns = [
        /^#\s+/m,               // Titre h1
        /^##\s+/m,              // Titre h2
        /^###\s+/m,             // Titre h3
        /^>/m,                  // Citation
        /^-\s+/m,               // Liste à puces
        /^[0-9]+\.\s+/m,        // Liste numérotée
        /\[.+\]\(.+\)/,         // Lien
        /!\[.+\]\(.+\)/,        // Image
        /^```[\s\S]+```$/m,     // Bloc de code
        /\*\*.+\*\*/,           // Gras
        /\*.+\*/,               // Italique
        /~~.+~~/,               // Barré
        /^---$/m                // Ligne horizontale
      ]
      
      return markdownPatterns.some(pattern => pattern.test(content))
    },
    
    // Méthode pour rendre le contenu (HTML ou Markdown)
    renderContent(content) {
      if (!content) return '';
      
      // Vérifier si le contenu est en markdown
      if (this.isMarkdown(content)) {
        // Configuration de marked pour le texte mais sans image
        marked.setOptions({
          gfm: true,
          breaks: true,
          smartLists: true,
          smartypants: true
        });
        
        try {
          // Convertir le markdown en HTML
          let htmlContent = marked.parse(content);
          
          // Supprimer les balises img pour n'afficher que le texte
          htmlContent = htmlContent.replace(/<img[^>]*>/g, '');
          
          return htmlContent;
        } catch (error) {
          console.error('Erreur lors du rendu markdown:', error);
          return content;
        }
      }
      
      // Si ce n'est pas du markdown, retourner le contenu tel quel
      return content;
    },
    
    stripHtml(html) {
      if (!html) return '';
      const temp = document.createElement('div');
      temp.innerHTML = html;
      return temp.textContent || temp.innerText || '';
    },
    
    async fetchArticles() {
      try {
        this.isLoading = true;
        this.error = null;

        // Tentative de récupération des articles via l'API
        const response = await api.get('/articles');
        this.articles = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des articles depuis l'API:", error);
        this.error = "Impossible de charger les articles depuis l'API. Affichage des données locales.";

        // En cas d'erreur, utilise les données statiques de articles.json
        this.articles = articlesData;
      } finally {
        this.isLoading = false;
      }
    },
    
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
    getCategoryBadgeClass(category) {
      if (!category) return 'bg-gray-700/30 text-gray-300 border border-gray-600';
      
      const categoryMap = {
        LARAVEL: 'laravel-badge',
        VUE: 'vue-badge',
        TAILWIND: 'tailwind-badge',
        PHP: 'php-badge',
        JAVASCRIPT: 'js-badge',
        TYPESCRIPT: 'ts-badge',
        CSS: 'tailwind-badge',
        WORDPRESS: 'bg-indigo-500/20 text-indigo-300 border border-indigo-600/30',
        'SIDE PROJECTS': 'bg-purple-500/20 text-purple-300 border border-purple-600/30',
        LIFE: 'bg-teal-500/20 text-teal-300 border border-teal-600/30',
      };
      const upperCategory = category.toUpperCase();
      return categoryMap[upperCategory] || 'bg-gray-700/30 text-gray-300 border border-gray-600';
    },
    getArticleButtonClass(category) {
      if (!category) return 'bg-gray-700 hover:bg-gray-600 text-white';
      
      const upperCategory = category.toUpperCase();
      const buttonClasses = {
        LARAVEL: 'bg-red-700/80 hover:bg-red-600/80 text-white border-red-500/30',
        VUE: 'bg-green-700/80 hover:bg-green-600/80 text-white border-green-500/30',
        TAILWIND: 'bg-blue-700/80 hover:bg-blue-600/80 text-white border-blue-500/30',
        PHP: 'bg-purple-700/80 hover:bg-purple-600/80 text-white border-purple-500/30',
        JAVASCRIPT: 'bg-yellow-700/80 hover:bg-yellow-600/80 text-white border-yellow-500/30',
        TYPESCRIPT: 'bg-blue-700/80 hover:bg-blue-600/80 text-white border-blue-500/30',
      };
      return buttonClasses[upperCategory] || 'bg-gray-700 hover:bg-gray-600 text-white';
    },
    handleSearch() {
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
/* Styles pour le rendu Markdown dans les aperçus d'articles */
:deep(.prose-preview) {
  font-size: 0.95rem;
  color: inherit;
}

:deep(.prose-preview p) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

:deep(.prose-preview strong) {
  color: var(--color-text-light, #e5e7eb);
  font-weight: 600;
}

:deep(.prose-preview em) {
  font-style: italic;
  opacity: 0.9;
}

:deep(.prose-preview a) {
  color: #38bdf8;
  text-decoration: none;
}

:deep(.prose-preview a:hover) {
  text-decoration: underline;
}

:deep(.prose-preview ul),
:deep(.prose-preview ol) {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

:deep(.prose-preview li) {
  margin-bottom: 0.25rem;
}

:deep(.prose-preview code) {
  background-color: rgba(30, 41, 59, 0.4);
  padding: 0.1rem 0.25rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.9em;
}

:deep(.prose-preview blockquote) {
  border-left: 3px solid #38bdf8;
  padding-left: 0.75rem;
  opacity: 0.85;
  font-style: italic;
  margin: 0.5rem 0;
}

/* Animation pour le fade-in des articles */
.fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>