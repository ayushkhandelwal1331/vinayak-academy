import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import axios from 'axios';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact / demo enquiry form state and submission (POST /api/enquiry).
 */
export const useEnquiryStore = defineStore('enquiry', () => {
  const form = reactive({
    studentName: '',
    phoneNumber: '',
    email: '',
    grade: '',
    subject: '',
    message: '',
  });

  const errors = reactive({
    studentName: '',
    phoneNumber: '',
    email: '',
    grade: '',
    subject: '',
  });

  const submitting = ref(false);
  const successMessage = ref('');
  const errorMessage = ref('');

  function clearErrors() {
    errors.studentName = '';
    errors.phoneNumber = '';
    errors.email = '';
    errors.grade = '';
    errors.subject = '';
  }

  /** Live validation as the user types (invalid letters/symbols show immediately). */
  function validatePhoneWhileTyping() {
    const raw = form.phoneNumber;
    if (!raw.trim()) {
      errors.phoneNumber = '';
      return;
    }
    const allowedOnly = /^[\d\s\-+().]*$/;
    if (!allowedOnly.test(raw)) {
      errors.phoneNumber = 'Enter a valid mobile number (digits only)';
      return;
    }
    const digits = raw.replace(/\D/g, '');
    if (digits.length > 10) {
      errors.phoneNumber = 'Enter a valid 10-digit mobile number';
      return;
    }
    errors.phoneNumber = '';
  }

  /** Live validation while typing — non-empty value must match full email shape (same as submit). */
  function validateEmailWhileTyping() {
    const t = form.email.trim();
    if (!t) {
      errors.email = '';
      return;
    }
    if (!EMAIL_RE.test(t)) {
      errors.email = 'Enter a valid email';
      return;
    }
    errors.email = '';
  }

  function validate() {
    clearErrors();
    let ok = true;

    if (!form.studentName.trim()) {
      errors.studentName = 'Student name is required';
      ok = false;
    }
    const rawPhone = form.phoneNumber.trim();
    const phoneDigits = rawPhone.replace(/\D/g, '');
    const phoneAllowed = /^[\d\s\-+().]*$/;
    if (!rawPhone) {
      errors.phoneNumber = 'Phone number is required';
      ok = false;
    } else if (!phoneAllowed.test(rawPhone)) {
      errors.phoneNumber = 'Enter a valid mobile number (digits only)';
      ok = false;
    } else if (phoneDigits.length !== 10) {
      errors.phoneNumber = 'Enter a valid 10-digit mobile number';
      ok = false;
    }
    if (!form.email.trim()) {
      errors.email = 'Email is required';
      ok = false;
    } else if (!EMAIL_RE.test(form.email.trim())) {
      errors.email = 'Enter a valid email';
      ok = false;
    }
    if (!form.grade) {
      errors.grade = 'Please select a class';
      ok = false;
    }
    if (!form.subject) {
      errors.subject = 'Please select a subject';
      ok = false;
    }
    return ok;
  }

  function resetForm() {
    form.studentName = '';
    form.phoneNumber = '';
    form.email = '';
    form.grade = '';
    form.subject = '';
    form.message = '';
  }

  async function submitEnquiry() {
    successMessage.value = '';
    errorMessage.value = '';

    if (!validate()) return;

    submitting.value = true;
    try {
      const payload = {
        studentName: form.studentName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        email: form.email.trim(),
        grade: form.grade,
        subject: form.subject,
        message: form.message.trim(),
      };
      const { data } = await axios.post('/api/enquiry', payload);
      if (data.success) {
        successMessage.value = "Thank you! We'll contact you within 24 hours 🎉";
        resetForm();
      } else {
        errorMessage.value = data.message || 'Something went wrong. Please try again.';
      }
    } catch (e) {
      const msg = e.response?.data?.message;
      errorMessage.value = msg || 'Submission failed. Please check your connection and try again.';
    } finally {
      submitting.value = false;
    }
  }

  return {
    form,
    errors,
    submitting,
    successMessage,
    errorMessage,
    validate,
    validatePhoneWhileTyping,
    validateEmailWhileTyping,
    submitEnquiry,
  };
});
