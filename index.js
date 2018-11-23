/* eslint-disable no-underscore-dangle, no-unused-vars, no-bitwise, no-console */
const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');

const app = express();

let db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((database) => {
    db = database.db();
    app.listen(process.env.PORT);
  })
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  db.collection('subscribers').find({ email: req.body.email }).toArray()
    .then((subscribers) => {
      if (subscribers.length === 0 && /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email) === true) {
        return db.collection('subscribers').insertOne({
          email: req.body.email,
          _id: [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join(''),
        })
          .then(() => res.sendStatus(201));
      }
      return res.sendStatus(400);
    })
    .catch(() => res.sendStatus(500));
});

app.get('/unsubscribe/:email/:id', (req, res) => {
  db.collection('subscribers').find({ email: req.params.email }).toArray()
    .then((subscribers) => {
      if (subscribers.length === 1 && subscribers[0]._id === req.params.id) {
        return db.collection('subscribers').deleteOne({ email: req.params.email })
          .then(() => res.sendStatus(200));
      }
      return res.sendStatus(400);
    })
    .catch(() => res.sendStatus(500));
});

app.post('/viewall', (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    db.collection('subscribers').find().toArray()
      .then(subscribers => res.json(subscribers))
      .catch(() => res.sendStatus(500));
  }
  return res.sendStatus(400);
});
