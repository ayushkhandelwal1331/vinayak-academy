import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Subtle fade-in + slide-up when the element enters the viewport (Intersection Observer).
 * @param {{ threshold?: number, once?: boolean }} options
 */
export function useFadeInOnView(options = {}) {
  const root = ref(null);
  const isVisible = ref(false);
  const threshold = options.threshold ?? 0.12;
  const once = options.once !== false;

  let observer;

  onMounted(() => {
    const el = root.value;
    if (!el || typeof IntersectionObserver === 'undefined') {
      isVisible.value = true;
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return { root, isVisible };
}
