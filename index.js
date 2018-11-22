const express = require('express');
const cors = require('cors');

const app = express();
const MongoClient = require('mongodb').MongoClient;
const db;

MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
  if(err) throw err;
  db = database;
  app.listen(process.env.PORT || 8080);
});

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  db.emails.insert( { item: req.body.email, qty: 15 } )
    .then(() => res.json("Success!"))
    .catch(() => res.status(500));
})
