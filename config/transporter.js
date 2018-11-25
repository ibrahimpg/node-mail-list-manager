const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: 'mail.nanoca.sh',
  port: 26,
  secure: false, // use TLS
  tls: { rejectUnauthorized: false },
  // You can erase all of the above and just uncomment 'service' to use a well-known service
  // You can find a list of well-known services here: https://nodemailer.com/smtp/well-known/#supported-services
  // Bear in mind that you should only use this for testing purposes
  // service: 'Outlook365',
  pool: true,
  auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
});
