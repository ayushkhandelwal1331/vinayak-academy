<script setup>
import Navbar from '../components/Navbar.vue';
import HeroSection from '../components/HeroSection.vue';
import AboutSection from '../components/AboutSection.vue';
import SubjectsSection from '../components/SubjectsSection.vue';
import WhyChooseUs from '../components/WhyChooseUs.vue';
import ReviewsSection from '../components/ReviewsSection.vue';
import Footer from '../components/Footer.vue';
import FloatingWhatsApp from '../components/FloatingWhatsApp.vue';
</script>

<template>
  <div class="min-h-screen bg-white">
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <SubjectsSection />
      <WhyChooseUs />
      <ReviewsSection />
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>
</template>
