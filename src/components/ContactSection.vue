<template>
  <section id="contact" class="mb-12">
    <div class="portfolio-container">
      <h3 class="section-title">Contact</h3>

      <!-- Utilisation du composant AppLoader -->
      <AppLoader v-if="isLoading" message="Loading contact..." />

      <!-- Utilisation du composant AppError -->
      <AppError v-else-if="error" :message="error" />

      <div v-else class="card p-6 backdrop-blur-md rounded-lg border border-gray-700/30">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Formulaire de contact -->
          <div class="w-full md:w-2/3">
            <form @submit.prevent="sendEmail" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-300 mb-1"
                    >Name</label
                  >
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-tailwind-blue focus:border-tailwind-blue text-gray-200"
                    :class="{ 'border-red-500': errors.name }"
                    required
                  />
                  <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-300 mb-1"
                    >Email</label
                  >
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-tailwind-blue focus:border-tailwind-blue text-gray-200"
                    :class="{ 'border-red-500': errors.email }"
                    required
                  />
                  <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
                </div>
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-300 mb-1"
                  >Subject</label
                >
                <input
                  type="text"
                  id="subject"
                  v-model="form.subject"
                  class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-tailwind-blue focus:border-tailwind-blue text-gray-200"
                  :class="{ 'border-red-500': errors.subject }"
                  required
                />
                <p v-if="errors.subject" class="mt-1 text-sm text-red-500">{{ errors.subject }}</p>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-300 mb-1"
                  >Message</label
                >
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-tailwind-blue focus:border-tailwind-blue text-gray-200"
                  :class="{ 'border-red-500': errors.message }"
                  required
                ></textarea>
                <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
              </div>

              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="privacy"
                  v-model="form.privacy"
                  class="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-tailwind-blue"
                  :class="{ 'border-red-500': errors.privacy }"
                  required
                />
                <label for="privacy" class="text-sm text-gray-300">
                  I agree to the
                  <a href="#" class="text-tailwind-blue hover:underline">privacy policy</a>
                </label>
              </div>
              <p v-if="errors.privacy" class="mt-1 text-sm text-red-500">{{ errors.privacy }}</p>

              <!-- Bouton plus proéminent -->
              <div class="mt-6">
                <button
                  type="submit"
                  class="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                  :disabled="formSubmitting"
                >
                  <span v-if="formSubmitting" class="mr-2">
                    <svg
                      class="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                  <span class="text-base">{{
                    formSubmitting ? 'Sending...' : 'Send Message'
                  }}</span>
                </button>
              </div>

              <!-- Message de confirmation amélioré -->
              <div
                v-if="successMessage"
                class="mt-4 p-4 bg-green-900/30 border border-green-700 text-green-400 rounded-md flex items-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p class="font-medium">Message Sent Successfully!</p>
                  <p class="mt-1">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              </div>

              <div
                v-if="errorMessage"
                class="mt-4 p-4 bg-red-900/30 border border-red-700 text-red-400 rounded-md flex items-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p class="font-medium">There was a problem sending your message</p>
                  <p class="mt-1">{{ errorMessage }}</p>
                  <p class="mt-1">
                    Please contact me directly by email at:
                    <a href="mailto:bezaraflorent@gmail.com" class="text-white underline">
                      bezaraflorent@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>

          <!-- Informations de contact -->
          <div class="w-full md:w-1/3">
            <div class="space-y-6">
              <div>
                <h2 class="text-xl font-semibold mb-2 text-gray-200">Let's Work Together</h2>
                <p class="text-gray-400">
                  Have a project in mind? I'm ready to transform your ideas into exceptional digital
                  experiences.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-medium mb-2 text-gray-300">Contact Info</h3>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2 text-vue-green mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href="mailto:bezaraflorent@gmail.com"
                      class="text-gray-300 hover:text-tailwind-blue transition-colors"
                    >
                      bezaraflorent@gmail.com
                    </a>
                  </li>
                  <li class="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2 text-laravel-red mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span class="text-gray-300">+261 34 93 452 51</span>
                  </li>
                  <li class="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2 text-tailwind-blue mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span class="text-gray-300">Mahajanga, Madagascar</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="text-lg font-medium mb-2 text-gray-300">Connect</h3>
                <div class="flex space-x-4">
                  <a href="#" class="text-gray-400 hover:text-vue-green transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                      />
                    </svg>
                  </a>
                  <a href="#" class="text-gray-400 hover:text-laravel-red transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </a>
                  <a href="#" class="text-gray-400 hover:text-tailwind-blue transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppLoader from '@/components/ui/AppLoader.vue'
import AppError from '@/components/ui/AppError.vue'
import emailjs from 'emailjs-com'

export default {
  name: 'ContactSection',
  components: {
    AppLoader,
    AppError,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
        privacy: false,
      },
      errors: {},
      formSubmitting: false,
      successMessage: '',
      errorMessage: '',
    }
  },
  methods: {
    validateForm() {
      this.errors = {}
      let isValid = true

      if (!this.form.name.trim()) {
        this.errors.name = 'Name is required'
        isValid = false
      }

      if (!this.form.email.trim()) {
        this.errors.email = 'Email is required'
        isValid = false
      } else if (!this.validateEmail(this.form.email)) {
        this.errors.email = 'Please enter a valid email address'
        isValid = false
      }

      if (!this.form.subject.trim()) {
        this.errors.subject = 'Subject is required'
        isValid = false
      }

      if (!this.form.message.trim()) {
        this.errors.message = 'Message is required'
        isValid = false
      }

      if (!this.form.privacy) {
        this.errors.privacy = 'You must agree to the privacy policy'
        isValid = false
      }

      return isValid
    },

    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },

    // Dans votre méthode sendEmail
    async sendEmail() {
      if (!this.validateForm()) {
        return
      }

      this.formSubmitting = true
      this.successMessage = ''
      this.errorMessage = ''

      try {
        // Initialiser EmailJS avec votre clé publique
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

        // Préparer le template avec les données du formulaire
        const templateParams = {
          from_name: this.form.name,
          reply_to: this.form.email,
          subject: this.form.subject,
          message: this.form.message,
        }

        // Envoyer l'email via EmailJS
        const response = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
        )

        console.log('Email sent successfully:', response)
        this.successMessage =
          "Your message has been sent successfully! I'll get back to you shortly."
        this.resetForm()
      } catch (error) {
        console.error('Error sending email:', error)
        this.errorMessage =
          'Something went wrong. Please try again or contact me directly via email.'
      } finally {
        this.formSubmitting = false
      }
    },

    // Méthode de secours utilisant mailto (non utilisée par défaut)
    createMailtoLink() {
      const recipient = 'bezaraflorent@gmail.com'
      const subject = encodeURIComponent(this.form.subject)
      const body = encodeURIComponent(
        `Name: ${this.form.name}\nEmail: ${this.form.email}\n\nMessage:\n${this.form.message}`,
      )

      return `mailto:${recipient}?subject=${subject}&body=${body}`
    },

    resetForm() {
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: '',
        privacy: false,
      }
    },
  },
}
</script>

<style scoped>
.card {
  background-color: rgba(31, 41, 55, 0.5);
}
</style>
