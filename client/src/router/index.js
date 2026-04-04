import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import BookDemo from '../views/BookDemo.vue';

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
  ],
});

export default router;
