<template>
  <div>
    <Header />
    <section class="mb-12">
      <div class="portfolio-container">
        <ArticlesSection />
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
import ArticlesSection from '../components/ArticlesSection.vue'
import NewsletterSection from '../components/NewsletterSection.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'ArticlesView',
  components: {
    Header,
    ArticlesSection,
    NewsletterSection,
    Footer,
  },
}
</script>
