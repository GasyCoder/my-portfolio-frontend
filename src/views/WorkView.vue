<template>
  <div>
    <Header />
    <section class="mb-12">
      <div class="portfolio-container">
        <WorkSection />
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
import WorkSection from '../components/WorkSection.vue'
import NewsletterSection from '../components/NewsletterSection.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'WorkView',
  components: {
    Header,
    WorkSection,
    NewsletterSection,
    Footer,
  },
}
</script>
