const mongoUtil = require('../controllers/mongoUtil');

const transporter = require('../config/transporter');

module.exports = (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    const db = mongoUtil.getDb();
    return db.collection('subscribers').find({}, { projection: { _id: 0 } }).toArray()
      .then((subscribers) => {
        transporter.sendMail({
          from: process.env.EMAIL_ADDRESS,
          to: subscribers,
          subject: req.body.subject,
          html: req.body.html,
        })
          .then(() => res.sendStatus(200));
      })
      .catch(() => res.sendStatus(500));
  }
  return res.sendStatus(400);
};
