<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goBookDemo() {
  router.push({ name: 'book-demo' });
}

function goContact() {
  router.push({ name: 'contact' });
}
</script>

<template>
  <section class="bg-white px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 lg:px-8" aria-label="Actions and highlights">
    <div class="relative mx-auto max-w-4xl text-center">
      <div
        class="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-5"
      >
        <button
          type="button"
          class="bg-primary hover:bg-primary/90 w-full rounded-xl px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition sm:w-auto"
          @click="goBookDemo"
        >
          Book a Free Demo Class
        </button>
        <button
          type="button"
          class="bg-primary hover:bg-primary/90 w-full rounded-xl px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition sm:w-auto"
          @click="goContact"
        >
          Contact Us
        </button>
      </div>
    </div>
  </section>
</template>
