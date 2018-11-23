/* eslint-disable no-undef */
module.exports = (req, res) => {
  db.collection('subscribers').find({ email: req.params.email }).toArray()
    .then((subscribers) => {
      if (subscribers.length === 1 && subscribers[0]._id === req.params.id) {
        return db.collection('subscribers').deleteOne({ email: req.params.email })
          .then(() => res.sendStatus(200));
      }
      return res.sendStatus(400);
    })
    .catch(() => res.sendStatus(500));
};
