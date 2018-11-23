/* eslint-disable no-undef */

const express = require('express');

const app = express();

module.exports = (req, res) => {
  app.get('db').collection('subscribers').find({ email: req.params.email }).toArray()
    .then((subscribers) => {
      if (subscribers.length === 1 && subscribers[0]._id === req.params.id) {
        return app.get('db').collection('subscribers').deleteOne({ email: req.params.email })
          .then(() => res.sendStatus(200));
      }
      return res.sendStatus(400);
    })
    .catch(() => res.sendStatus(500));
};
