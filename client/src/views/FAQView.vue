<script setup>
import { computed, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import FloatingWhatsApp from '../components/FloatingWhatsApp.vue';

const activeCategory = ref('all');

const categoryTabs = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'classes', label: 'Classes' },
  { id: 'fees', label: 'Fees' },
  { id: 'technical', label: 'Technical' },
  { id: 'results', label: 'Results' },
];

const FAQ_DATA = [
  {
    category: 'general',
    q: 'What is Vinayak Academy?',
    a: 'Vinayak Academy is an online tuition platform founded by Ruchi Khandelwal (M.A., M.Ed., B.Ed.) with over 20 years of teaching experience. We offer personalized online coaching for students from Class 1 to Class 10.',
  },
  {
    category: 'general',
    q: 'Who is the teacher?',
    a: 'Ruchi Khandelwal — a highly qualified educator with M.A., M.Ed., and B.Ed. degrees and 20+ years of experience in teaching Mathematics, Science, English, Hindi and Social Studies.',
  },
  {
    category: 'general',
    q: 'Which boards do you cover?',
    a: 'We cover CBSE, ICSE and State Board curriculums for Class 1 to Class 10.',
  },
  {
    category: 'general',
    q: 'Is there a free demo class?',
    a: 'Yes! Your first class is completely FREE with no payment or commitment required. Book it from our Free Demo page.',
  },
  {
    category: 'classes',
    q: 'Which app is used for online classes?',
    a: 'Classes are conducted live on Google Meet or Zoom. A stable internet connection and a device with camera is all you need.',
  },
  {
    category: 'classes',
    q: 'Are classes recorded?',
    a: 'Yes, all classes are recorded and shared with students so they can revise at their own pace anytime.',
  },
  {
    category: 'classes',
    q: 'What is the batch size?',
    a: 'We keep batches small — maximum 5 to 6 students — to ensure every student gets personal attention.',
  },
  {
    category: 'classes',
    q: 'How many classes per week?',
    a: 'Depends on your plan. Basic: 3 days/week, Standard: 4 days/week, Premium: 5 days/week.',
  },
  {
    category: 'classes',
    q: 'What is the duration of each class?',
    a: 'Each class is 45 minutes long. Premium plan classes are 60 minutes.',
  },
  {
    category: 'classes',
    q: 'Can I reschedule a class?',
    a: 'Yes, you can reschedule with at least 24 hours notice. We are flexible with timings.',
  },
  {
    category: 'classes',
    q: 'What if I miss a class?',
    a: 'No worries! All classes are recorded. You can watch the recording anytime and clear doubts in the next class.',
  },
  {
    category: 'fees',
    q: 'How are fees paid?',
    a: 'Fees are paid monthly via UPI or Bank Transfer. No cash payments needed.',
  },
  {
    category: 'fees',
    q: 'Is there any joining or registration fee?',
    a: 'Absolutely not. Zero joining fee, zero hidden charges.',
  },
  {
    category: 'fees',
    q: 'Can I get a refund?',
    a: 'If you are not satisfied after the first paid month, we will discuss a solution. Student satisfaction is our priority.',
  },
  {
    category: 'fees',
    q: 'Do you offer sibling discounts?',
    a: 'Yes! Special discounts are available for siblings enrolling together. Contact us on WhatsApp for details.',
  },
  {
    category: 'technical',
    q: 'What device do I need for classes?',
    a: 'Any smartphone, tablet, or laptop with a working camera, microphone and stable internet connection works perfectly.',
  },
  {
    category: 'technical',
    q: 'What internet speed is required?',
    a: 'A minimum of 2 Mbps internet speed is recommended for smooth video classes.',
  },
  {
    category: 'technical',
    q: 'What if there is a technical issue during class?',
    a: 'We reschedule the class or extend the next one at no extra cost. Technical issues happen — we handle them with flexibility.',
  },
  {
    category: 'results',
    q: 'How do you track student progress?',
    a: 'Through regular weekly/monthly tests, progress reports and parent updates on WhatsApp.',
  },
  {
    category: 'results',
    q: 'How soon will I see improvement?',
    a: 'Most students show noticeable improvement within 4 to 6 weeks of consistent classes.',
  },
  {
    category: 'results',
    q: 'Do you help with school homework and assignments?',
    a: 'Yes! Homework help and assignment guidance is included as part of doubt support.',
  },
];

const faqItems = FAQ_DATA.map((item, index) => ({
  ...item,
  id: `faq-${index}`,
}));

const expandedIds = ref([]);

function isExpanded(key) {
  return expandedIds.value.includes(key);
}

function toggleItem(key) {
  if (expandedIds.value.includes(key)) {
    expandedIds.value = expandedIds.value.filter((id) => id !== key);
  } else {
    expandedIds.value = [...expandedIds.value, key];
  }
}

const filteredFaq = computed(() =>
  activeCategory.value === 'all'
    ? faqItems
    : faqItems.filter((item) => item.category === activeCategory.value),
);

const WHATSAPP_HREF = 'https://wa.me/917000679090';
</script>

<template>
  <div class="min-h-screen bg-white">
    <Navbar />
    <main>
      <!-- Hero -->
      <section
        class="border-light relative overflow-hidden border-b bg-white px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8"
        aria-labelledby="faq-heading"
      >
        <div
          class="pointer-events-none absolute -right-12 top-8 h-40 w-40 rounded-full bg-accent/15 blur-2xl"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute bottom-8 left-[-2rem] h-32 w-32 rounded-full bg-primary/10 blur-2xl"
          aria-hidden="true"
        />
        <div class="relative mx-auto max-w-3xl text-center">
          <h1
            id="faq-heading"
            class="font-display text-dark text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            Frequently Asked Questions
          </h1>
          <p class="text-dark/80 mx-auto mt-4 max-w-2xl text-base sm:text-lg">
            Everything you need to know about Vinayak Academy
          </p>
        </div>
      </section>

      <!-- Categories + accordion -->
      <section class="border-light border-t bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <p class="font-display text-dark text-xl font-bold sm:text-2xl">Browse by topic</p>
          <p class="text-dark/70 mt-1 text-sm sm:text-base">
            Tap a category to find answers quickly.
          </p>

          <div
            class="mt-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="FAQ categories"
          >
            <button
              v-for="tab in categoryTabs"
              :key="tab.id"
              type="button"
              role="tab"
              :aria-selected="activeCategory === tab.id"
              class="shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all sm:text-base"
              :class="
                activeCategory === tab.id
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-light text-dark/80 hover:bg-accent/15 hover:text-primary border border-transparent'
              "
              @click="activeCategory = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <ul class="mt-8 space-y-3" role="list">
            <li
              v-for="item in filteredFaq"
              :key="item.id"
              class="border-light overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 class="m-0">
                <button
                  type="button"
                  class="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5 sm:py-5"
                  :aria-expanded="isExpanded(item.id)"
                  :aria-controls="`faq-panel-${item.id}`"
                  :id="`faq-trigger-${item.id}`"
                  @click="toggleItem(item.id)"
                >
                  <span class="text-dark pr-2 text-sm font-bold sm:text-base">
                    {{ item.q }}
                  </span>
                  <span
                    class="text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-light transition-transform duration-300"
                    :class="{ 'rotate-180': isExpanded(item.id) }"
                    aria-hidden="true"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <Transition name="faq-acc">
                <div
                  v-show="isExpanded(item.id)"
                  :id="`faq-panel-${item.id}`"
                  role="region"
                  :aria-labelledby="`faq-trigger-${item.id}`"
                  class="faq-acc-panel border-light border-t px-4 pb-4 pt-0 sm:px-5 sm:pb-5"
                >
                  <p class="text-dark/80 text-sm leading-relaxed sm:text-base">
                    {{ item.a }}
                  </p>
                </div>
              </Transition>
            </li>
          </ul>
        </div>
      </section>

    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>
</template>

<style scoped>
.faq-acc-enter-active,
.faq-acc-leave-active {
  overflow: hidden;
  transition:
    max-height 0.35s ease,
    opacity 0.28s ease;
}

.faq-acc-enter-from,
.faq-acc-leave-to {
  max-height: 0;
  opacity: 0;
}

.faq-acc-enter-to,
.faq-acc-leave-from {
  max-height: 48rem;
  opacity: 1;
}
</style>
