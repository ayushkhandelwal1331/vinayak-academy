<script setup>
import FadeInBlock from './FadeInBlock.vue';

/**
 * Replace placeholder reviews with actual student reviews when you have them.
 */
const reviews = [
  {
    text: 'The online classes are so clear — I finally enjoy maths problems instead of fearing them. Doubts are solved patiently every time.',
    name: 'Aarav S., Class 8',
    subject: 'Mathematics',
  },
  {
    text: 'My daughter’s science grades improved in one term. The tutor explains with real-life examples and keeps her engaged throughout.',
    name: 'Parent of Kiara M., Class 6',
    subject: 'Science',
  },
  {
    text: 'Flexible timing helped us balance school and tuition. Weekly tests gave us confidence before exams.',
    name: 'Rohan K., Class 10',
    subject: 'All subjects',
  },
  {
    text: 'English grammar used to confuse me; now I can write essays with structure. The feedback is always constructive.',
    name: 'Ananya P., Class 7',
    subject: 'English',
  },
  {
    text: 'Hindi literature felt difficult until these classes broke it down simply. I actually look forward to the sessions.',
    name: 'Vikram T., Class 9',
    subject: 'Hindi',
  },
  {
    text: 'Social studies is no longer boring — maps and civics topics are taught in a way I remember easily.',
    name: 'Isha L., Class 5',
    subject: 'Social Studies',
  },
];
</script>

<template>
  <section id="reviews" class="from-light/50 bg-gradient-to-b to-light/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
    <FadeInBlock>
      <div class="mx-auto max-w-6xl">
        <h2 class="font-display text-primary mb-10 text-center text-3xl font-bold sm:text-4xl">
          What Our Students Say
        </h2>

        <!-- Auto-scroll row; pauses on hover -->
        <div
          class="reviews-marquee group relative overflow-hidden py-2"
          aria-label="Student testimonials"
        >
          <div class="reviews-marquee__track flex w-max gap-5">
            <!-- First set -->
            <article
              v-for="(r, i) in reviews"
              :key="`a-${i}`"
              class="border-accent/30 bg-white w-[280px] shrink-0 rounded-xl border-l-4 border-l-accent p-5 shadow-md sm:w-[320px]"
            >
              <p class="text-amber-500 text-sm" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</p>
              <p class="text-dark/85 mt-3 text-sm leading-relaxed">“{{ r.text }}”</p>
              <p class="text-primary mt-4 text-sm font-bold">{{ r.name }}</p>
              <p class="text-dark/60 text-xs font-medium">{{ r.subject }}</p>
            </article>
            <!-- Duplicate set for seamless loop -->
            <article
              v-for="(r, i) in reviews"
              :key="`b-${i}`"
              class="border-accent/30 bg-white w-[280px] shrink-0 rounded-xl border-l-4 border-l-accent p-5 shadow-md sm:w-[320px]"
              aria-hidden="true"
            >
              <p class="text-amber-500 text-sm">⭐⭐⭐⭐⭐</p>
              <p class="text-dark/85 mt-3 text-sm leading-relaxed">“{{ r.text }}”</p>
              <p class="text-primary mt-4 text-sm font-bold">{{ r.name }}</p>
              <p class="text-dark/60 text-xs font-medium">{{ r.subject }}</p>
            </article>
          </div>
        </div>
      </div>
    </FadeInBlock>
  </section>
</template>

<style scoped>
@keyframes reviews-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.reviews-marquee__track {
  animation: reviews-scroll 45s linear infinite;
}

.reviews-marquee:hover .reviews-marquee__track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .reviews-marquee__track {
    animation: none;
    flex-wrap: wrap;
    width: 100% !important;
    max-width: 100%;
    justify-content: center;
  }
}
</style>
