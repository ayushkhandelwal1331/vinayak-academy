import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import BookDemo from '../views/BookDemo.vue';
import ContactUs from '../views/ContactUs.vue';
import FAQView from '../views/FAQView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 72 };
    }
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/book-demo',
      name: 'book-demo',
      component: BookDemo,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactUs,
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQView,
    },
    {
      path: '/free-demo',
      redirect: { name: 'book-demo' },
    },
  ],
});

export default router;
