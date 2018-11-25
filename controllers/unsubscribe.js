const mongodb = require('../config/database');

module.exports = (req, res) => {
  const db = mongodb.getDb();
  db.collection('subscribers').find({ email: req.params.email }).toArray()
    .then((subscribers) => {
      if (subscribers.length === 1 && subscribers[0]._id === req.params.id) {
        return db.collection('subscribers').deleteOne({ email: req.params.email })
          .then(() => res.status(200).send('Successfully unsubscribed from this mailing list.'));
      }
      return res.sendStatus(400);
    })
    .catch(() => res.sendStatus(500));
};
