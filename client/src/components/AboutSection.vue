<script setup>
import FadeInBlock from './FadeInBlock.vue';

const highlights = [
  'M.A., M.Ed., B.Ed. Qualified',
  'CBSE & ICSE Board Expert',
  'Personalized Attention for Every Student',
  'Regular Tests & Progress Tracking',
  
];

const subjects = [
  'Mathematics',
  'Science',
  'English',
  'Hindi',
  'Social Studies',
];
</script>

<template>
  <section id="about" class="bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
    <FadeInBlock>
      <div class="mx-auto max-w-6xl">
        <h2 class="font-display text-primary mb-12 text-center text-3xl font-bold sm:mb-16 sm:text-4xl">
          Meet Your Tutor
        </h2>

        <div
          class="grid grid-cols-1 items-center gap-10 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-12"
        >
          <!-- Left: photo -->
          <div class="flex justify-center">
            <div class="inline-block shrink-0 rounded-full shadow-lg ring-4 ring-primary">
              <img
                src="/tutor.png"
                alt="Ruchi Khandelwal, tutor"
                width="100"
                height="100"
                class="h-[150px] w-[150px] rounded-full object-cover"
              />
            </div>
          </div>

          <!-- Right: text -->
          <div class="space-y-5 text-center lg:text-left">
            <h3 class="font-display text-2xl font-semibold text-dark sm:text-3xl">
              Ruchi Khandelwal (M.A., M.Ed.)
            </h3>
            <p class="text-dark/85 leading-relaxed">
              A dedicated and passionate educator with over 20+ years of experience in tutoring.
              Specializing in making complex concepts simple and building a strong foundation for
              students from Class 5 to 10.
            </p>

            <blockquote
              class="border-l-4 border-primary bg-white/70 py-4 pl-4 pr-4 text-left shadow-sm sm:pl-5"
            >
              <p class="text-dark/90 font-medium italic leading-relaxed">
                &ldquo;Ask once, ask twice, ask a hundred times — understanding is more important than speed.&rdquo;
              </p>
              <footer class="mt-3 text-sm font-semibold text-primary">&mdash; Ruchi Khandelwal</footer>
            </blockquote>

            <div
              class="flex flex-wrap justify-center gap-2 lg:justify-start"
              aria-label="Subjects taught"
            >
              <span
                v-for="s in subjects"
                :key="s"
                class="inline-flex rounded-full border border-primary/25 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm"
              >
                {{ s }}
              </span>
            </div>

            <ul class="mx-auto w-full max-w-xl space-y-3 text-left lg:mx-0">
              <li
                v-for="item in highlights"
                :key="item"
                class="flex items-start gap-3 text-dark/90"
              >
                <span class="mt-0.5 inline-flex shrink-0" aria-hidden="true">
                  <svg
                    class="h-5 w-5 text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="relative mx-auto mt-12 max-w-5xl lg:mt-14">
          <div
            class="border-accent/20 bg-white/90 flex flex-col flex-wrap items-center justify-center gap-4 rounded-2xl border px-4 py-5 shadow-md backdrop-blur sm:flex-row sm:gap-8 md:gap-12"
            aria-label="Academy highlights"
          >
            <p class="text-center text-sm font-semibold text-dark sm:text-base">
              <span class="text-primary">300+</span> Students Taught
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
      </div>
    </FadeInBlock>
  </section>
</template>
