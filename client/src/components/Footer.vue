<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goSection(e, id) {
  e.preventDefault();
  if (route.path === '/') {
    scrollTo(id);
  } else {
    router.push({ path: '/', hash: `#${id}` });
  }
}

function goBookDemo(e) {
  e.preventDefault();
  router.push({ name: 'book-demo' });
}

function goContact(e) {
  e.preventDefault();
  router.push({ name: 'contact' });
}
</script>

<template>
  <footer class="bg-dark text-white">
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <p class="font-display text-xl font-semibold">Vinayak Academy 🎓</p>
          <p class="text-white/75 mt-2 text-sm leading-relaxed">
            Quality online tuition for Class 5–10 — clear concepts, caring guidance, real progress.
          </p>
        </div>
        <div>
          <p class="font-display text-lg font-semibold text-white">Quick links</p>
          <ul class="mt-3 space-y-2 text-sm">
            <li>
              <a
                :href="route.path === '/' ? '#home' : '/#home'"
                class="text-white/80 hover:text-accent transition"
                @click="goSection($event, 'home')"
                >Home</a
              >
            </li>
            <li>
              <a
                :href="route.path === '/' ? '#about' : '/#about'"
                class="text-white/80 hover:text-accent transition"
                @click="goSection($event, 'about')"
                >About</a
              >
            </li>
            <li>
              <a
                :href="route.path === '/' ? '#subjects' : '/#subjects'"
                class="text-white/80 hover:text-accent transition"
                @click="goSection($event, 'subjects')"
                >Subjects</a
              >
            </li>
            <li>
              <a
                :href="route.path === '/' ? '#reviews' : '/#reviews'"
                class="text-white/80 hover:text-accent transition"
                @click="goSection($event, 'reviews')"
                >Reviews</a
              >
            </li>
            <li>
              <a
                href="/contact"
                class="text-white/80 hover:text-accent transition"
                @click="goContact"
                >Contact us</a
              >
            </li>
            <li>
              <a
                href="/book-demo"
                class="text-white/80 hover:text-accent transition"
                @click="goBookDemo"
                >Book demo</a
              >
            </li>
          </ul>
        </div>
        <div>
          <p class="font-display text-lg font-semibold text-white">Contact</p>
          <ul class="text-white/80 mt-3 space-y-2 text-sm">
            <li>Phone: <span class="text-white/90">+91-7000679090 / 6261373921</span></li>
            <li>Email: <span class="text-white/90">roochikhandelwal1977@gmail.com</span></li>
            <li>WhatsApp: <span class="text-white/90">+91-7000679090</span></li>
          </ul>
        </div>
      </div>
      <p class="text-white/50 mt-10 border-t border-white/10 pt-8 text-center text-sm">
        © 2025 Vinayak Academy. All rights reserved.
      </p>
    </div>
  </footer>
</template>
