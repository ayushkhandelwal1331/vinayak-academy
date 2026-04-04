<script setup>
import FadeInBlock from './FadeInBlock.vue';
</script>

<template>
  <section id="about" class="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
    <FadeInBlock>
      <div class="mx-auto max-w-6xl">
        <h2 class="font-display text-primary mb-10 text-center text-3xl font-bold sm:text-4xl">
          Meet Your Tutor
        </h2>
        <div class="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <!-- Placeholder photo -->
          <div
            class="bg-light flex aspect-[4/5] w-full max-w-md flex-col items-center justify-center rounded-2xl shadow-lg ring-1 ring-primary/10 md:mx-0 md:max-w-none"
          >
            <span class="text-dark/50 px-6 text-center text-sm font-medium">
              Teacher Photo — Replace with actual image
            </span>
          </div>
          <div class="space-y-5">
            <h3 class="font-display text-2xl font-semibold text-dark sm:text-3xl">Ruchi Khandelwal</h3>
            <p class="text-dark/85 leading-relaxed">
              A dedicated and passionate educator with over 20 years of experience in tutoring.
              Specializing in making complex concepts simple and building a strong foundation for students
              from Class 1 to Class 10.
            </p>
            <ul class="text-dark/90 list-inside list-disc space-y-2 marker:text-accent">
              <li>M.Ed qualified</li>
              <li>CBSE &amp; ICSE board expertise</li>
              <li>Personalized attention for every student</li>
              <li>Regular tests and progress tracking</li>
              <li>Doubt-clearing sessions available</li>
            </ul>
          </div>
        </div>
      </div>
    </FadeInBlock>
  </section>
</template>
