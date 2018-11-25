const mongodb = require('mongodb');

let _db;

exports.connectToServer = () => mongodb.MongoClient.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true })
  .then((database) => {
    _db = database.db();
  })
  .catch(err => console.log(err));

exports.getDb = () => _db;
