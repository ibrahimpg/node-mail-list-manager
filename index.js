const express = require('express');
const cors = require('cors');

const app = express();

const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
  if(err) throw err;
  db = database;
  console.log(db);
  app.listen(process.env.PORT || 8080);
});

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  db.collection('emails').insert( { item: req.body.email } )
    .then(() => res.json("Success!"))
    .catch(() => res.status(500));
});
