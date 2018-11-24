/* eslint-disable no-bitwise, no-undef */
const mongoUtil = require('../controllers/mongoUtil');

module.exports = (req, res) => {
  const db = mongoUtil.getDb();
  db.collection('subscribers').find({ email: req.body.email }).toArray()
    .then((subscribers) => {
      if (subscribers.length === 0 && /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email) === true) {
        return db.collection('subscribers').insertOne({
          email: req.body.email,
          _id: [...Array(10)].map(() => (~~(Math.random() * 36)).toString(36)).join(''),
        })
          .then(() => res.sendStatus(201));
      }
      return res.sendStatus(400);
    })
    .catch(() => res.sendStatus(500));
};
