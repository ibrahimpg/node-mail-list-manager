const mongodb = require('../config/database');
const transporter = require('../config/transporter');

module.exports = (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    const db = mongodb.getDb();
    return db.collection('subscribers').find({}, { projection: { _id: 0 } }).toArray()
      .then((subscribers) => {
        subscribers.forEach((subscriber) => {
          transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: subscriber.email,
            subject: req.body.subject,
            html: `${req.body.html}<br>
            <p>
            Click 
            <a href="${process.env.SERVER_URL}/unsubscribe/${subscriber.email}/${subscriber._id}">here</a> 
            to unsubscribe
            </p>`,
          });
        });
      })
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  }
  return res.sendStatus(400);
};
