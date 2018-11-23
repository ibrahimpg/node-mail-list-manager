const mongodb = require('mongodb');

let _db;

exports.connectToServer = (callback) => {
  mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
    _db = database;
    console.log(_db);
    return callback(err);
  });
};

exports.getDb = () => _db;
