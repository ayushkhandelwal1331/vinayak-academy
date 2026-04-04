<script setup>
import Navbar from '../components/Navbar.vue';
import ContactSection from '../components/ContactSection.vue';
import Footer from '../components/Footer.vue';
import FloatingWhatsApp from '../components/FloatingWhatsApp.vue';

const PHONE_DISPLAY = '+91-7000679090 ';
const PHONE_PRIMARY_TEL = '+917000679090';
const PHONE_SECONDARY_TEL = '+916261373921';
const EMAIL = 'roochikhandelwal1977@gmail.com';
const WHATSAPP_NUMBER = '917000679090';
const WHATSAPP_PREFILL =
  "Hi! I'd like to get in touch with Vinayak Academy. Please share more details.";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;
</script>

<template>
  <div class="min-h-screen bg-white">
    <Navbar />
    <main>
      <section
        class="relative overflow-hidden bg-gradient-to-br from-light via-white to-blue-100/80 px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8"
        aria-labelledby="contact-page-heading"
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
          <p class="text-accent mb-2 text-sm font-semibold tracking-wide uppercase">Get in touch</p>
          <h1
            id="contact-page-heading"
            class="font-display text-dark text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            Contact Us
          </h1>
          <p class="text-dark/80 mx-auto mt-4 max-w-2xl text-base sm:text-lg">
            Questions about classes, timings, or enrollment? Reach us by phone, email, or WhatsApp —
            or send a message using the form below. We typically respond within 24 hours.
          </p>
        </div>
      </section>

      <section class="border-light border-t bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-14">
          <div class="lg:col-span-5">
            <h2 class="font-display text-dark text-2xl font-bold sm:text-3xl">How to reach us</h2>
            <p class="text-dark/75 mt-2 text-sm sm:text-base">
              Choose what works best for you. We teach online via Zoom or Google Meet.
            </p>
            <ul class="mt-8 space-y-4">
              <li>
                <a
                  :href="`tel:${PHONE_PRIMARY_TEL}`"
                  class="border-light group flex gap-4 rounded-2xl border bg-gradient-to-br from-light/60 to-white p-5 shadow-sm transition hover:border-accent/30 hover:shadow-md"
                >
                  <span
                    class="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    aria-hidden="true"
                  >
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  <span class="min-w-0 text-left">
                    <span class="text-dark block text-sm font-semibold">Phone</span>
                    <span class="text-primary group-hover:text-accent mt-0.5 block text-sm font-bold">
                      {{ PHONE_DISPLAY }}
                    </span>
                    <span class="text-dark/60 mt-1 block text-xs">Tap the card to call our primary number</span>
                  </span>
                </a>
                <p class="text-dark/55 mt-3 pl-1 text-sm">
                  Also reach us at
                  <a :href="`tel:${PHONE_SECONDARY_TEL}`" class="text-accent font-semibold hover:underline">
                    +91-6261373921
                  </a>
                </p>
              </li>
              <li>
                <a
                  :href="`mailto:${EMAIL}`"
                  class="border-light group flex gap-4 rounded-2xl border bg-gradient-to-br from-light/60 to-white p-5 shadow-sm transition hover:border-accent/30 hover:shadow-md"
                >
                  <span
                    class="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    aria-hidden="true"
                  >
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span class="min-w-0 text-left">
                    <span class="text-dark block text-sm font-semibold">Email</span>
                    <span class="text-primary group-hover:text-accent mt-0.5 block break-all text-sm font-bold">
                      {{ EMAIL }}
                    </span>
                    <span class="text-dark/60 mt-1 block text-xs">Get a reply within 24 hours</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  :href="whatsappHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="border-light group flex gap-4 rounded-2xl border bg-gradient-to-br from-green-50/80 to-white p-5 shadow-sm transition hover:border-[#25D366]/40 hover:shadow-md"
                >
                  <span
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#128C7E]"
                    aria-hidden="true"
                  >
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                      />
                    </svg>
                  </span>
                  <span class="min-w-0 text-left">
                    <span class="text-dark block text-sm font-semibold">WhatsApp</span>
                    <span class="text-[#128C7E] group-hover:text-[#25D366] mt-0.5 block text-sm font-bold">
                      Chat on WhatsApp
                    </span>
                    <span class="text-dark/60 mt-1 block text-xs">You can also send a message directly</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="lg:col-span-7">
            <ContactSection
              embedded
              heading="Send us a message"
              subheading="Share your details and we’ll get back to you — same form as booking a demo class."
            />
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>
</template>
