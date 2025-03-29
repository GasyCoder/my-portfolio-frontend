<template>
  <div>
    <Header />
    <section class="mb-12">
      <div class="portfolio-container">
        <ArticlesSection />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import ArticlesSection from '../components/ArticlesSection.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'ArticlesView',
  components: {
    Header,
    ArticlesSection,
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
