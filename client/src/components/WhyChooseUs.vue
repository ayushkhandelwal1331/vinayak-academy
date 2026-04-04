<script setup>
import FadeInBlock from './FadeInBlock.vue';

const features = [
  {
    icon: '👩‍🏫',
    title: 'Personal Attention',
    text: 'Small batch sizes ensure every student gets individual focus',
  },
  {
    icon: '📅',
    title: 'Flexible Timings',
    text: 'Schedule classes at your convenience, 7 days a week',
  },
  {
    icon: '📝',
    title: 'Regular Assessments',
    text: 'Weekly tests and monthly progress reports for every student',
  },
  {
    icon: '💬',
    title: 'Doubt Support',
    text: 'WhatsApp doubt support between classes, always accessible',
  },
];
</script>

<template>
  <section class="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
    <FadeInBlock>
      <div class="mx-auto max-w-6xl">
        <h2 class="font-display text-primary mb-10 text-center text-3xl font-bold sm:text-4xl">
          Why Students Love Vinayak Academy
        </h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="f in features"
            :key="f.title"
            class="border-light rounded-2xl border bg-gradient-to-br from-white to-light/50 p-6 shadow-sm"
          >
            <span class="text-3xl" aria-hidden="true">{{ f.icon }}</span>
            <h3 class="font-display mt-3 text-lg font-semibold text-dark">{{ f.title }}</h3>
            <p class="text-dark/80 mt-2 text-sm leading-relaxed">{{ f.text }}</p>
          </div>
        </div>
      </div>
    </FadeInBlock>
  </section>
</template>
