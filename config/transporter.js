const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: 'mail.nanoca.sh',
  port: 26,
  secure: false, // use TLS
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
  // service: 'Outlook365', https://nodemailer.com/smtp/well-known/#supported-services
  pool: true,
  auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
});
