import mongoose from 'mongoose';

/**
 * Enquiry document — submitted from the contact form on the marketing site.
 */
const enquirySchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  grade: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Enquiry', enquirySchema);
