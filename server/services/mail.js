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

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
