const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  pool: true,
  service: 'Outlook365',
  auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
});
