const mongodb = require('../config/database');

module.exports = (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    const db = mongodb.getDb();
    return db.collection('subscribers').find({}, { projection: { _id: 0 } }).toArray()
      .then(subscribers => res.json(subscribers))
      .catch(() => res.sendStatus(500));
  }
  return res.sendStatus(400);
};
