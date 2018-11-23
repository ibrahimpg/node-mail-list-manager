import { MongoClient } from 'mongodb';

let _db;

export function connectToServer(callback) {
  MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
    _db = database.db();
    return callback(err);
  });
}
export function getDb() {
  return _db;
}
