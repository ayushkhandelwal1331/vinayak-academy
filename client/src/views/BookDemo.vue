<script setup>
import Navbar from '../components/Navbar.vue';
import ContactSection from '../components/ContactSection.vue';
import Footer from '../components/Footer.vue';
import FloatingWhatsApp from '../components/FloatingWhatsApp.vue';
</script>

<template>
  <div class="min-h-screen bg-white">
    <Navbar />
    <main class="pt-4">
      <ContactSection />
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>
</template>