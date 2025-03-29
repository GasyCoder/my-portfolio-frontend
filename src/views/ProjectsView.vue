<template>
  <div>
    <Header />
    <section class="mb-12">
      <div class="portfolio-container">
        <CodeSection />
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
import CodeSection from '../components/CodeSection.vue'
import NewsletterSection from '../components/NewsletterSection.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'ProjectsView',
  components: {
    Header,
    CodeSection,
    NewsletterSection,
    Footer,
  },
}
</script>

<style scoped>
.section-title {
  position: relative;
  display: inline-block;
  font-weight: 700;
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 20px;
}
.section-title::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 40px;
  height: 4px;
  background-color: #3b82f6;
}
</style>
