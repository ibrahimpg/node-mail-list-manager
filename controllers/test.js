const nodemailer = require('nodemailer');

module.exports = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
  });
  transporter.sendMail({
    from: `"${process.env.ORG_NAME}" <${process.env.EMAIL_ADDRESS}>`,
    to: req.body.email,
    subject: req.body.subject,
    text: `
${req.body.message}
// Unsubscribe link here. <URL>/user email/user id
`,
  })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
};
