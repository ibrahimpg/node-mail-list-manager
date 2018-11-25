const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  pool: true,
  host: 'mail.nanoca.sh',
  port: 26,
  secure: true, // use TLS
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
  // service: 'Outlook365',
  auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
});
