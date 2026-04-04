<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goBookDemo() {
  router.push({ name: 'book-demo' });
}
</script>

<template>
  <section
    id="home"
    class="relative overflow-hidden bg-gradient-to-br from-light via-white to-blue-100/80 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8"
  >
    <!-- Decorative floating shapes (CSS only) -->
    <div
      class="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full bg-accent/15 blur-2xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-24 left-[-3rem] h-40 w-40 rounded-full bg-primary/10 blur-2xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute left-1/3 top-1/2 h-24 w-24 rotate-12 rounded-3xl border-2 border-accent/20"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute right-1/4 top-24 h-16 w-16 rounded-full border border-primary/20"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-4xl text-center">
      <h1
        class="font-display text-dark text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
      >
        Learn with Confidence, Grow with Clarity
      </h1>
      <p class="mx-auto mt-5 max-w-2xl text-base text-dark/80 sm:text-lg">
        Online tuition classes for Class 1–10 | Maths, Science, English, Hindi &amp; Social Studies
      </p>
      <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
        <button
          type="button"
          class="bg-primary hover:bg-primary/90 w-full rounded-xl px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition sm:w-auto"
          @click="goBookDemo"
        >
          Book a Free Demo Class
        </button>
        <button
          type="button"
          class="border-accent text-primary hover:bg-light w-full rounded-xl border-2 bg-white px-8 py-3.5 font-semibold transition sm:w-auto"
          @click="scrollTo('subjects')"
        >
          View Subjects
        </button>
      </div>
    </div>

    <!-- Stats bar -->
    <div class="relative mx-auto mt-14 max-w-5xl">
      <div
        class="border-accent/20 bg-white/90 flex flex-col flex-wrap items-center justify-center gap-4 rounded-2xl border px-4 py-5 shadow-md backdrop-blur sm:flex-row sm:gap-8 md:gap-12"
      >
        <p class="text-center text-sm font-semibold text-dark sm:text-base">
          <span class="text-primary">500+</span> Students Taught
        </p>
        <span class="text-accent/40 hidden sm:inline" aria-hidden="true">|</span>
        <p class="text-center text-sm font-semibold text-dark sm:text-base">
          <span class="text-primary">20+</span> Years Experience
        </p>
        <span class="text-accent/40 hidden sm:inline" aria-hidden="true">|</span>
        <p class="text-center text-sm font-semibold text-dark sm:text-base">
          <span class="text-primary">5</span> Subjects
        </p>
        <span class="text-accent/40 hidden sm:inline" aria-hidden="true">|</span>
        <p class="text-center text-sm font-semibold text-dark sm:text-base">Online via Zoom / Google Meet</p>
      </div>
    </div>
  </section>
</template>
