<script setup>
import FadeInBlock from './FadeInBlock.vue';

const subjects = [
  {
    icon: '🔢',
    name: 'Mathematics',
    description: 'Building logical thinking and problem-solving skills',
  },
  {
    icon: '🔬',
    name: 'Science',
    description: 'Exploring the world through experiments and concepts',
  },
  {
    icon: '📖',
    name: 'English',
    description: 'Grammar, comprehension, and communication skills',
  },
  {
    icon: '🗣️',
    name: 'Hindi',
    description: 'Language fluency and literature understanding',
  },
  {
    icon: '🌍',
    name: 'Social Studies',
    description: 'History, Geography, Civics made interesting',
  },
];
</script>

<template>
  <section id="subjects" class="from-light/80 bg-gradient-to-b to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
    <FadeInBlock>
      <div class="mx-auto max-w-6xl">
        <h2 class="font-display text-primary mb-10 text-center text-3xl font-bold sm:text-4xl">
          Subjects We Offer
        </h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          <article
            v-for="s in subjects"
            :key="s.name"
            class="group border-light hover:border-accent/40 flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/20"
          >
            <span class="text-3xl" aria-hidden="true">{{ s.icon }}</span>
            <h3 class="font-display mt-3 text-lg font-semibold text-dark">{{ s.name }}</h3>
            <p class="text-dark/75 mt-2 flex-1 text-sm leading-relaxed">{{ s.description }}</p>
            <span
              class="bg-light text-primary mt-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold"
            >
              Class 5 to 10
            </span>
          </article>
        </div>
      </div>
    </FadeInBlock>
  </section>
</template>
