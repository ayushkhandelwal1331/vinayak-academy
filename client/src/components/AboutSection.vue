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
        <div class="mx-auto flex max-w-3xl flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">
          <div class="shrink-0">
            <img
              src="/tutor.png"
              alt="Ruchi Khandelwal, tutor"
              width="112"
              height="112"
              class="h-24 w-24 rounded-full object-cover shadow-md ring-2 ring-primary/15 sm:h-28 sm:w-28"
            />
          </div>
          <div class="space-y-5 text-center sm:text-left">
            <h3 class="font-display text-2xl font-semibold text-dark sm:text-3xl">Ruchi Khandelwal (M.A., M.Ed., B.Ed.)</h3>
            <p class="text-dark/85 leading-relaxed">
              A dedicated and passionate educator with over 20 years of experience in tutoring.
              Specializing in making complex concepts simple and building a strong foundation for students
              from Class 5 to 10.
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
