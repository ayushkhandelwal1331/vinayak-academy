import { Router } from 'express';
import Enquiry from '../models/Enquiry.js';

const router = Router();

const requiredFields = ['studentName', 'phoneNumber', 'email', 'grade', 'subject'];

/**
 * POST /api/enquiry — save a new enquiry from the website form.
 */
router.post('/enquiry', async (req, res) => {
  try {
    const body = req.body || {};
    const missing = requiredFields.filter((key) => !body[key] || String(body[key]).trim() === '');

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`,
      });
    }

    const enquiry = new Enquiry({
      studentName: String(body.studentName).trim(),
      phoneNumber: String(body.phoneNumber).trim(),
      email: String(body.email).trim(),
      grade: String(body.grade).trim(),
      subject: String(body.subject).trim(),
      message: body.message != null ? String(body.message).trim() : '',
    });

    await enquiry.save();

    return res.status(201).json({
      success: true,
      message: 'Enquiry saved successfully',
      id: enquiry._id,
    });
  } catch (err) {
    console.error('POST /enquiry error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while saving enquiry',
    });
  }
});

/**
 * GET /api/enquiries — list all enquiries (for admin use later).
 */
router.get('/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
    return res.json({ success: true, enquiries });
  } catch (err) {
    console.error('GET /enquiries error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching enquiries',
    });
  }
});

export default router;
