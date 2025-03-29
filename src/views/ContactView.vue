<template>
  <div>
    <Header />
    <section class="mb-12">
      <div class="portfolio-container">
        <ContactSection />
      </div>
    </section>
    <section class="mb-12">
      <div class="portfolio-container">
        <NewsletterSection />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import ContactSection from '../components/ContactSection.vue'
import NewsletterSection from '../components/NewsletterSection.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'ContactView',
  components: {
    Header,
    ContactSection,
    NewsletterSection,
    Footer,
  },
}
</script>
