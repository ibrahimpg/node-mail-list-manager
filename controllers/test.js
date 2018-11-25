const transporter = require('../config/transporter');

module.exports = (req, res) => {
  transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: req.body.email,
    subject: req.body.subject,
    html: req.body.html,
  })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
};
