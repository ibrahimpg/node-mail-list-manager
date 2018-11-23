/* eslint-disable no-underscore-dangle, no-unused-vars, no-bitwise */
const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');

const app = express();

let db;

mongodb.MongoClient.connect(process.env.MONGODB_URI)
  .then((database) => {
    db = database.db();
    app.listen(process.env.PORT || 8080);
  })
  .catch(() => console.log('What whattt'));

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  db.collection('emails').find({ email: req.body.email }).toArray()
    .then((emails) => {
      if (emails.length > 0) {
        return res.json('email already exists yo!');
      }
      return db.collection('emails').insertOne({
        email: req.body.email,
        _id: [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join(''),
      })
        .then(() => res.json('Success!'));
    })
    .catch(err => res.status(500).json(err));
});

app.get('/delete/:email/:id', (req, res) => {
  db.collection('emails').findOne({ email: req.params.email })
    .then((emails) => {
      if (emails._id === req.params.id) {
        return db.collection('emails').remove({ email: req.params.email })
          .then(() => res.json('deleted your email bro!'));
      } if (emails === null) {
        return res.json('no such email broh');
      }
      return res.json('no bueno amigo');
    })
    .catch(err => res.status(500).json(err));
});
