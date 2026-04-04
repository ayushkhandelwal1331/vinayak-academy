import nodemailer from 'nodemailer';

function trimEnv(key) {
  const v = process.env[key];
  return v != null ? String(v).trim() : '';
}

function isMailConfigured() {
  return Boolean(
    trimEnv('SMTP_USER') && trimEnv('SMTP_PASS') && trimEnv('NOTIFY_EMAIL')
  );
}

/**
 * Gmail: use built-in `service: 'gmail'` so the correct SMTP host is always used.
 * A wrong SMTP_HOST (e.g. accidentally set to your email) causes DNS errors like
 * `queryA EBADNAME user@gmail.com`.
 */
function createTransporter() {
  const user = trimEnv('SMTP_USER');
  const pass = trimEnv('SMTP_PASS');
  const hostRaw = trimEnv('SMTP_HOST');
  const hostMisconfigured = !hostRaw || hostRaw.includes('@');

  const isGmailUser = /@gmail\.com$/i.test(user);
  if (isGmailUser && (hostMisconfigured || /^smtp\.gmail\.com$/i.test(hostRaw))) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  const port = Number(trimEnv('SMTP_PORT')) || 587;
  const secure =
    trimEnv('SMTP_SECURE') === 'true' || trimEnv('SMTP_SECURE') === '1';
  const host = hostMisconfigured ? 'smtp.gmail.com' : hostRaw;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

/**
 * Sends you an email when someone submits the enquiry form.
 * Returns { sent: true } or { sent: false, reason } — never throws.
 */
export async function sendEnquiryNotification(enquiry) {
  if (!isMailConfigured()) {
    return { sent: false, reason: 'SMTP not configured' };
  }

  const to = trimEnv('NOTIFY_EMAIL');
  const smtpUser = trimEnv('SMTP_USER');
  const from = trimEnv('SMTP_FROM') || `"Vinayak Academy" <${smtpUser}>`;

  const lines = [
    'New Student Enquiry',
    '',
    `Student name: ${enquiry.studentName}`,
    `Phone: ${enquiry.phoneNumber}`,
    `Email: ${enquiry.email}`,
    `Grade: ${enquiry.grade}`,
    `Subject: ${enquiry.subject}`,
    enquiry.message ? `Message:\n${enquiry.message}` : 'Message: (none)',
  ];

  const text = lines.join('\n');
  const html = `
    <h2>New website enquiry</h2>
    <table style="border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0"><strong>Student name</strong></td><td>${escapeHtml(enquiry.studentName)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Phone</strong></td><td>${escapeHtml(enquiry.phoneNumber)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>${escapeHtml(enquiry.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Grade</strong></td><td>${escapeHtml(enquiry.grade)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Subject</strong></td><td>${escapeHtml(enquiry.subject)}</td></tr>
    </table>
    ${enquiry.message ? `<p><strong>Message</strong></p><p>${escapeHtml(enquiry.message).replace(/\n/g, '<br/>')}</p>` : ''}
  `;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from,
      to,
      subject: `[Vinayak Academy] New enquiry from ${enquiry.studentName}`,
      text,
      html,
    });
    return { sent: true };
  } catch (err) {
    console.error('sendEnquiryNotification failed:', err.message);
    if (err.response) {
      console.error('SMTP response:', err.response);
    }
    return { sent: false, reason: err.message };
  }
}

/**
 * Sends a confirmation email to the student after the enquiry is saved.
 * Returns { sent: true } or { sent: false, reason } — never throws.
 */
export async function sendStudentEnquiryConfirmation(enquiry) {
  if (!isMailConfigured()) {
    return { sent: false, reason: 'SMTP not configured' };
  }

  const smtpUser = trimEnv('SMTP_USER');
  const from = trimEnv('SMTP_FROM') || `"Vinayak Academy" <${smtpUser}>`;
  const supportPhone = '+91-7000679090';
  const supportPhoneHref = 'tel:+917000679090';
  const whatsappHref = 'https://wa.me/917000679090';
  const studentName = enquiry.studentName;

  const text = [
    `Dear ${studentName},`,
    '',
    'Thank you for contacting Vinayak Academy.',
    'We have received your enquiry and will contact you within 24 hours.',
    '',
    'Your submission summary:',
    `Name: ${studentName}`,
    `Class: ${enquiry.grade}`,
    `Subject: ${enquiry.subject}`,
    `Phone number: ${enquiry.phoneNumber}`,
    '',
    `WhatsApp: ${supportPhone}`,
    `Call: ${supportPhone}`,
    '',
    'Warm regards,',
    'Ruchi Khandelwal',
    'Vinayak Academy',
  ].join('\n');

  const html = `
    <div style="margin:0;padding:24px 0;background:#f4f8ff;font-family:Arial,sans-serif;color:#163152;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d9e7ff;border-radius:20px;overflow:hidden;box-shadow:0 12px 32px rgba(19,69,145,0.12);">
        <div style="padding:32px;background:linear-gradient(135deg,#0f52ba,#2d7ff9);color:#ffffff;">
          <div style="font-size:13px;letter-spacing:1.6px;text-transform:uppercase;opacity:0.92;">Vinayak Academy</div>
          <h1 style="margin:12px 0 0;font-size:28px;line-height:1.3;">Thank you for contacting us!</h1>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 16px;font-size:18px;line-height:1.6;">Dear ${escapeHtml(studentName)},</p>
          <p style="margin:0 0 14px;font-size:16px;line-height:1.7;color:#365277;">
            Thank you for reaching out to Vinayak Academy. We have received your enquiry and will contact you within <strong>24 hours</strong>.
          </p>
          <div style="margin:24px 0;padding:22px;background:#f7fbff;border:1px solid #d7e6ff;border-radius:16px;">
            <h2 style="margin:0 0 16px;font-size:18px;color:#0f52ba;">Your submission summary</h2>
            <table style="width:100%;border-collapse:collapse;font-size:15px;color:#163152;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e4efff;"><strong>Name</strong></td>
                <td style="padding:10px 0;border-bottom:1px solid #e4efff;text-align:right;">${escapeHtml(studentName)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e4efff;"><strong>Class</strong></td>
                <td style="padding:10px 0;border-bottom:1px solid #e4efff;text-align:right;">${escapeHtml(enquiry.grade)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e4efff;"><strong>Subject</strong></td>
                <td style="padding:10px 0;border-bottom:1px solid #e4efff;text-align:right;">${escapeHtml(enquiry.subject)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0 0;"><strong>Phone number</strong></td>
                <td style="padding:10px 0 0;text-align:right;">${escapeHtml(enquiry.phoneNumber)}</td>
              </tr>
            </table>
          </div>
          <div style="margin:28px 0 10px;">
            <a href="${whatsappHref}" style="display:inline-block;margin:0 12px 12px 0;padding:14px 24px;background:#0f52ba;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:700;">Chat on WhatsApp</a>
            <a href="${supportPhoneHref}" style="display:inline-block;margin:0 12px 12px 0;padding:14px 24px;background:#eaf2ff;color:#0f52ba;text-decoration:none;border:1px solid #b8d0ff;border-radius:999px;font-weight:700;">Call ${escapeHtml(supportPhone)}</a>
          </div>
          <p style="margin:20px 0 0;font-size:15px;line-height:1.7;color:#365277;">
            Warm regards,<br/>
            <strong>Ruchi Khandelwal</strong><br/>
            Vinayak Academy
          </p>
        </div>
      </div>
    </div>
  `;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from,
      to: enquiry.email,
      subject: 'Thank you for contacting Vinayak Academy! 🎓',
      text,
      html,
    });
    return { sent: true };
  } catch (err) {
    console.error('sendStudentEnquiryConfirmation failed:', err.message);
    if (err.response) {
      console.error('SMTP response:', err.response);
    }
    return { sent: false, reason: err.message };
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
