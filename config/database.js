const mongodb = require('mongodb');
const express = require('express');

const app = express();

let _db;

exports.connectToServer = () => mongodb.MongoClient.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true })
  .then((database) => {
    _db = database.db();
    app.listen(process.env.PORT);
  })
  .catch(err => console.log(err));

exports.getDb = () => _db;
