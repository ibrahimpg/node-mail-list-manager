const crypto = require('crypto');
const mongodb = require('../config/database');

module.exports = (req, res) => {
  const db = mongodb.getDb();
  db.collection('subscribers').find({ email: req.body.email }).toArray()
    .then((subscribers) => {
      if (subscribers.length === 0 && /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email) === true) {
        return db.collection('subscribers').insertOne({
          email: req.body.email,
          _id: crypto.randomBytes(8).toString('hex'),
        })
          .then(() => res.sendStatus(201));
      }
      return res.sendStatus(400);
    })
    .catch(() => res.sendStatus(500));
};
