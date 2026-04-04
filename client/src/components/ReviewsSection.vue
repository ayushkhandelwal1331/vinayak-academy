<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import FadeInBlock from './FadeInBlock.vue';

/**
 * Replace placeholder reviews with actual student reviews when you have them.
 */
const reviews = [
  {
    text: 'The online classes are so clear — I finally enjoy maths problems instead of fearing them. Doubts are solved patiently every time.',
    name: 'Aarav S., Class 8',
    subject: 'Mathematics',
    city: 'Mumbai',
  },
  {
    text: 'My daughter’s science grades improved in one term. The tutor explains with real-life examples and keeps her engaged throughout.',
    name: 'Parent of Kiara M., Class 6',
    subject: 'Science',
    city: 'Bengaluru',
  },
  {
    text: 'Flexible timing helped us balance school and tuition. Weekly tests gave us confidence before exams.',
    name: 'Rohan K., Class 10',
    subject: 'All subjects',
    city: 'Delhi',
  },
  {
    text: 'English grammar used to confuse me; now I can write essays with structure. The feedback is always constructive.',
    name: 'Ananya P., Class 7',
    subject: 'English',
    city: 'Pune',
  },
  {
    text: 'Hindi literature felt difficult until these classes broke it down simply. I actually look forward to the sessions.',
    name: 'Vikram T., Class 9',
    subject: 'Hindi',
    city: 'Hyderabad',
  },
  {
    text: 'Social studies is no longer boring — maps and civics topics are taught in a way I remember easily.',
    name: 'Isha L., Class 5',
    subject: 'Social Studies',
    city: 'Jaipur',
  },
];

const viewportRef = ref(null);
const isReducedMotion = ref(
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);
const isHovering = ref(false);

const displayReviews = computed(() =>
  isReducedMotion.value ? reviews : [...reviews, ...reviews]
);

const SCROLL_STEP = 336;
const AUTO_SCROLL_PX_PER_SEC = 42;
const ARROW_PAUSE_MS = 4500;

let rafId = 0;
let lastFrameTime = 0;
let autoPauseUntil = 0;
let mq;

function loopScroll() {
  if (typeof window === 'undefined') return;
  const el = viewportRef.value;
  if (!el || isReducedMotion.value) {
    lastFrameTime = 0;
    rafId = requestAnimationFrame(loopScroll);
    return;
  }

  const now = performance.now();
  const paused =
    isHovering.value || Date.now() < autoPauseUntil || document.visibilityState === 'hidden';

  if (!paused && lastFrameTime) {
    const dt = (now - lastFrameTime) / 1000;
    const half = el.scrollWidth / 2;
    if (half > 0) {
      el.scrollLeft += AUTO_SCROLL_PX_PER_SEC * dt;
      if (el.scrollLeft >= half - 1) {
        el.scrollLeft -= half;
      }
    }
  }
  lastFrameTime = now;
  rafId = requestAnimationFrame(loopScroll);
}

function scrollPrev() {
  const el = viewportRef.value;
  if (!el || isReducedMotion.value) return;
  autoPauseUntil = Date.now() + ARROW_PAUSE_MS;
  const half = el.scrollWidth / 2;
  if (half > 0 && el.scrollLeft <= 8) {
    el.scrollLeft += half;
  }
  el.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
}

function scrollNext() {
  const el = viewportRef.value;
  if (!el || isReducedMotion.value) return;
  autoPauseUntil = Date.now() + ARROW_PAUSE_MS;
  const half = el.scrollWidth / 2;
  if (half > 0 && el.scrollLeft >= half - SCROLL_STEP - 16) {
    el.scrollLeft -= half;
  }
  el.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
}

function onMqChange(e) {
  isReducedMotion.value = e.matches;
  if (viewportRef.value) {
    viewportRef.value.scrollLeft = 0;
  }
}

onMounted(() => {
  mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  isReducedMotion.value = mq.matches;
  mq.addEventListener('change', onMqChange);
  rafId = requestAnimationFrame(loopScroll);
});

onUnmounted(() => {
  mq?.removeEventListener('change', onMqChange);
  cancelAnimationFrame(rafId);
});

function isDuplicateCard(i) {
  return !isReducedMotion.value && i >= reviews.length;
}
</script>

<template>
  <section id="reviews" class="from-light/50 bg-gradient-to-b to-light/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
    <FadeInBlock>
      <div class="mx-auto max-w-6xl">
        <h2 class="font-display text-primary mb-10 text-center text-3xl font-bold sm:text-4xl">
          What Our Students Say
        </h2>

        <div
          class="group relative"
          :class="{ 'reviews-controls': !isReducedMotion }"
          aria-label="Student testimonials"
        >
          <button
            v-if="!isReducedMotion"
            type="button"
            class="border-accent/40 bg-white/95 text-primary hover:bg-primary hover:text-white absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-11 sm:w-11"
            aria-label="Previous testimonials"
            @click="scrollPrev"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            v-if="!isReducedMotion"
            type="button"
            class="border-accent/40 bg-white/95 text-primary hover:bg-primary hover:text-white absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-11 sm:w-11"
            aria-label="Next testimonials"
            @click="scrollNext"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div
            ref="viewportRef"
            class="reviews-viewport overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            @mouseenter="isHovering = true"
            @mouseleave="isHovering = false"
          >
            <div
              class="reviews-track flex w-max gap-5"
              :class="{ 'reviews-track--static': isReducedMotion }"
            >
              <article
                v-for="(r, i) in displayReviews"
                :key="i"
                class="border-accent/30 bg-white w-[280px] shrink-0 rounded-xl border-l-4 border-l-accent p-5 shadow-md sm:w-[320px]"
                :aria-hidden="isDuplicateCard(i) ? true : undefined"
              >
                <p class="text-amber-500 text-sm" :aria-label="isDuplicateCard(i) ? undefined : '5 out of 5 stars'">⭐⭐⭐⭐⭐</p>
                <p class="text-dark/85 mt-3 text-sm leading-relaxed">“{{ r.text }}”</p>
                <p class="text-primary mt-4 text-sm font-bold">{{ r.name }}</p>
                <p class="text-dark/60 text-xs font-medium">{{ r.subject }}</p>
                <p class="text-dark/50 mt-0.5 text-xs">{{ r.city }}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </FadeInBlock>
  </section>
</template>

<style scoped>
.reviews-controls {
  padding-left: 2.75rem;
  padding-right: 2.75rem;
}

@media (min-width: 640px) {
  .reviews-controls {
    padding-left: 3.25rem;
    padding-right: 3.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reviews-viewport {
    overflow-x: visible;
  }

  .reviews-track--static {
    flex-wrap: wrap;
    width: 100% !important;
    max-width: 100%;
    justify-content: center;
  }
}
</style>
