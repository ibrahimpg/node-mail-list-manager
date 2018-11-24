const mongodb = require('mongodb');

let _db;

exports.connectToServer = (callback) => {
  mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
    _db = database.db();
    return callback(err);
  });
};

exports.getDb = () => _db;

// mongodb.MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
//   .then((database) => {
//     db = database.db();
//     app.listen(process.env.PORT);
//   })
//   .catch(err => console.log(err));
