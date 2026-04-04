<script setup>
import { storeToRefs } from 'pinia';
import { useEnquiryStore } from '../stores/enquiry';
import FadeInBlock from './FadeInBlock.vue';

defineProps({
  heading: { type: String, default: 'Book Your Free Demo Class' },
  subheading: {
    type: String,
    default: "Fill in your details and we'll get back to you within 24 hours",
  },
  embedded: { type: Boolean, default: false },
});

const enquiry = useEnquiryStore();
const { form, errors, submitting, successMessage, errorMessage } = storeToRefs(enquiry);

const grades = Array.from({ length: 10 }, (_, i) => ({
  value: `Class ${i + 1}`,
  label: `Class ${i + 1}`,
}));

const subjects = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Science', label: 'Science' },
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Social Studies', label: 'Social Studies' },
  { value: 'All Subjects', label: 'All Subjects' },
];
</script>

<template>
  <component
    :is="embedded ? 'div' : 'section'"
    :id="embedded ? undefined : 'contact'"
    :class="
      embedded
        ? 'w-full'
        : 'bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8'
    "
  >
    <FadeInBlock>
      <div :class="embedded ? 'mx-auto w-full max-w-2xl' : 'mx-auto max-w-xl'">
        <h2 class="font-display text-primary text-center text-3xl font-bold sm:text-4xl">
          {{ heading }}
        </h2>
        <p class="text-dark/75 mt-3 text-center text-sm sm:text-base">
          {{ subheading }}
        </p>

        <form
          class="border-light mt-10 space-y-5 rounded-2xl border bg-gradient-to-b from-light/40 to-white p-6 shadow-lg sm:p-8"
          novalidate
          @submit.prevent="enquiry.submitEnquiry()"
        >
          <div>
            <label for="studentName" class="mb-1 block text-sm font-semibold text-dark">Student Name *</label>
            <input
              id="studentName"
              v-model="form.studentName"
              type="text"
              required
              autocomplete="name"
              class="focus:ring-accent w-full rounded-xl border border-dark/15 px-4 py-3 text-dark outline-none ring-primary/0 transition focus:border-accent focus:ring-2"
              placeholder="Full name"
            />
            <p v-if="errors.studentName" class="mt-1 text-sm text-red-600">{{ errors.studentName }}</p>
          </div>

          <div>
            <label for="phone" class="mb-1 block text-sm font-semibold text-dark">Phone Number *</label>
            <input
              id="phone"
              v-model="form.phoneNumber"
              type="tel"
              inputmode="numeric"
              required
              autocomplete="tel"
              class="focus:ring-accent w-full rounded-xl border border-dark/15 px-4 py-3 text-dark outline-none focus:border-accent focus:ring-2"
              placeholder="10-digit mobile number"
              @input="enquiry.validatePhoneWhileTyping()"
            />
            <p v-if="errors.phoneNumber" class="mt-1 text-sm text-red-600">{{ errors.phoneNumber }}</p>
          </div>

          <div>
            <label for="email" class="mb-1 block text-sm font-semibold text-dark">Email Address *</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              class="focus:ring-accent w-full rounded-xl border border-dark/15 px-4 py-3 text-dark outline-none focus:border-accent focus:ring-2"
              placeholder="you@example.com"
              @input="enquiry.validateEmailWhileTyping()"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <div>
            <label for="grade" class="mb-1 block text-sm font-semibold text-dark">Class / Grade *</label>
            <select
              id="grade"
              v-model="form.grade"
              required
              class="focus:ring-accent w-full rounded-xl border border-dark/15 bg-white px-4 py-3 text-dark outline-none focus:border-accent focus:ring-2"
            >
              <option disabled value="">Select class</option>
              <option v-for="g in grades" :key="g.value" :value="g.value">{{ g.label }}</option>
            </select>
            <p v-if="errors.grade" class="mt-1 text-sm text-red-600">{{ errors.grade }}</p>
          </div>

          <div>
            <label for="subject" class="mb-1 block text-sm font-semibold text-dark">Subject Interested In *</label>
            <select
              id="subject"
              v-model="form.subject"
              required
              class="focus:ring-accent w-full rounded-xl border border-dark/15 bg-white px-4 py-3 text-dark outline-none focus:border-accent focus:ring-2"
            >
              <option disabled value="">Select subject</option>
              <option v-for="s in subjects" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
            <p v-if="errors.subject" class="mt-1 text-sm text-red-600">{{ errors.subject }}</p>
          </div>

          <div>
            <label for="message" class="mb-1 block text-sm font-semibold text-dark">Message / Any Questions</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="focus:ring-accent w-full resize-y rounded-xl border border-dark/15 px-4 py-3 text-dark outline-none focus:border-accent focus:ring-2"
              placeholder="Optional — tell us about your goals or preferred timings"
            />
          </div>

          <p v-if="successMessage" class="rounded-xl bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-800">
            {{ successMessage }}
          </p>
          <p v-if="errorMessage" class="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-800">
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            class="bg-primary hover:bg-primary/90 w-full rounded-xl py-3.5 font-bold text-white shadow-lg shadow-primary/20 transition disabled:opacity-60"
            :disabled="submitting"
          >
            {{ submitting ? 'Sending…' : 'Send Enquiry 🚀' }}
          </button>
        </form>
      </div>
    </FadeInBlock>
  </component>
</template>
