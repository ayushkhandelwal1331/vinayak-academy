import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Global UI state (navbar scroll shadow, mobile menu).
 * Pinia is the official Vue 3 store — we use it instead of Vuex.
 */
export const useUiStore = defineStore('ui', () => {
  const navbarScrolled = ref(false);
  const mobileMenuOpen = ref(false);

  function setNavbarScrolled(value) {
    navbarScrolled.value = Boolean(value);
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false;
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  }

  return {
    navbarScrolled,
    mobileMenuOpen,
    setNavbarScrolled,
    closeMobileMenu,
    toggleMobileMenu,
  };
});
