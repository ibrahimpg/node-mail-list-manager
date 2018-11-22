const express = require('express');
const cors = require('cors');

const app = express();

const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
  if(err) throw err;
  db = database.db();
  app.listen(process.env.PORT || 8080);
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  db.collection('emails').find({ email: req.body.email }).toArray()
    .then((emails) => res.json(emails))
    .catch((err) => res.status(500).json(err));
});

app.post('/', (req, res) => {
  const _id = [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
  db.collection('emails').find({ email: req.body.email }).toArray()
    .then((emails) => {
      if(emails.length > 0) {
        return res.json("email already exists yo!");
      }
      return db.collection('emails').insertOne({email: req.body.email, _id})
        .then(() => res.json("Success!"))
    })
    .catch((err) => res.status(500).json(err));
});