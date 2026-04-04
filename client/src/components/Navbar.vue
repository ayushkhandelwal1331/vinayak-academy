<script setup>
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useUiStore } from '../stores/ui';

const ui = useUiStore();
const route = useRoute();
const router = useRouter();
const { navbarScrolled, mobileMenuOpen } = storeToRefs(ui);

const sectionLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'subjects', label: 'Subjects' },
  { id: 'reviews', label: 'Reviews' },
];

function onScroll() {
  ui.setNavbarScrolled(window.scrollY > 8);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleSectionClick(e, id) {
  e.preventDefault();
  ui.closeMobileMenu();
  if (route.path === '/') {
    scrollToSection(id);
  } else {
    router.push({ path: '/', hash: `#${id}` });
  }
}

function goBookDemo(e) {
  e.preventDefault();
  ui.closeMobileMenu();
  router.push({ name: 'book-demo' });
}

function handleLogoClick(e) {
  e.preventDefault();
  ui.closeMobileMenu();
  if (route.path === '/') {
    scrollToSection('home');
  } else {
    router.push('/');
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 border-b border-transparent bg-white/95 backdrop-blur-sm transition-shadow duration-300',
      navbarScrolled ? 'shadow-md border-light' : '',
    ]"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <a
        href="/"
        class="font-display text-lg font-semibold text-primary sm:text-xl"
        @click="handleLogoClick"
      >
        Vinayak Academy 🎓
      </a>

      <!-- Desktop links -->
      <ul class="hidden items-center gap-8 md:flex">
        <li v-for="link in sectionLinks" :key="link.id">
          <a
            :href="route.path === '/' ? `#${link.id}` : `/#${link.id}`"
            class="text-dark/80 hover:text-accent font-sans text-sm font-semibold transition-colors"
            @click="handleSectionClick($event, link.id)"
          >
            {{ link.label }}
          </a>
        </li>
        <li>
          <a
            href="/book-demo"
            class="text-dark/80 hover:text-accent font-sans text-sm font-semibold transition-colors"
            :class="{ 'text-primary': route.name === 'book-demo' }"
            @click="goBookDemo"
          >
            Book Demo
          </a>
        </li>
      </ul>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="text-dark hover:text-primary inline-flex items-center justify-center rounded-lg p-2 md:hidden"
        aria-label="Toggle menu"
        :aria-expanded="mobileMenuOpen"
        @click="ui.toggleMobileMenu()"
      >
        <span class="sr-only">Menu</span>
        <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile panel -->
    <div
      v-show="mobileMenuOpen"
      class="border-t border-light bg-white px-4 py-4 shadow-inner md:hidden"
    >
      <ul class="flex flex-col gap-3">
        <li v-for="link in sectionLinks" :key="link.id">
          <a
            :href="route.path === '/' ? `#${link.id}` : `/#${link.id}`"
            class="text-dark hover:bg-light block rounded-lg px-3 py-2 font-semibold transition-colors"
            @click="handleSectionClick($event, link.id)"
          >
            {{ link.label }}
          </a>
        </li>
        <li>
          <a
            href="/book-demo"
            class="text-dark hover:bg-light block rounded-lg px-3 py-2 font-semibold transition-colors"
            :class="{ 'text-primary': route.name === 'book-demo' }"
            @click="goBookDemo"
          >
            Book Demo
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>
