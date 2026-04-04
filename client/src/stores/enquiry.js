import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import axios from 'axios';

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

  function validate() {
    clearErrors();
    let ok = true;

    if (!form.studentName.trim()) {
      errors.studentName = 'Student name is required';
      ok = false;
    }
    if (!form.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
      ok = false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errors.email = 'Email is required';
      ok = false;
    } else if (!emailRe.test(form.email.trim())) {
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
    submitEnquiry,
  };
});
