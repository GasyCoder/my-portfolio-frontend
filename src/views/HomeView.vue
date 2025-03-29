<template>
  <div>
    <Header />
    <Hero />
    <CodeSection />
    <ArticlesSection />
    <NewsletterSection />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Hero from '../components/Hero.vue'
import CodeSection from '../components/CodeSection.vue'
import ArticlesSection from '../components/ArticlesSection.vue'
import NewsletterSection from '../components/NewsletterSection.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    Header,
    Hero,
    CodeSection,
    ArticlesSection,
    NewsletterSection,
    Footer,
  },
}
</script>
