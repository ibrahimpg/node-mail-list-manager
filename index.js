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

app.post('/', (req, res) => {
  db.collection('emails').insertOne({email: req.body.email})
    .then(() => res.json("Success!"))
    .catch((err) => res.status(500).json(err));
});

app.get('/', (req, res) => {
  db.collection('emails').find({ email: req.body.email })
    .then((emails) => res.json(emails))
    .catch((err) => res.status(500).json(err));
});