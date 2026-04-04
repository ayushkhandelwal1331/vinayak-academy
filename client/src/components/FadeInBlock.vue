<script setup>
import { useFadeInOnView } from '../composables/useFadeInOnView';

const { root, isVisible } = useFadeInOnView();
</script>

<template>
  <div
    ref="root"
    :class="[
      'transition-all duration-700 ease-out motion-reduce:transition-none',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
    ]"
  >
    <slot />
  </div>
</template>
