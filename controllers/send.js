const mongodb = require('../config/database');
const transporter = require('../config/transporter');

module.exports = (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    const db = mongodb.getDb();
    return db.collection('subscribers').find({}, { projection: { _id: 0 } }).toArray()
      .then((subscribers) => { // has to be changed to a forEach or .map for unsub links to work
        subscribers.forEach(transporter.sendMail({
          from: process.env.EMAIL_ADDRESS,
          to: subscribers,
          subject: req.body.subject,
          html: `${req.body.html}<br><p>You are ${subscribers.email}</p>`,
        }))
          .then(() => res.sendStatus(200))
          .catch(err => console.log(err));
      })
      .catch(() => res.sendStatus(500));
  }
  return res.sendStatus(400);
};
