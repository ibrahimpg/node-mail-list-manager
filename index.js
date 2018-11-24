// Packages
const express = require('express');
// const nodemailer = require('nodemailer');
const cors = require('cors');

// MongoDB Connection Module
const mongoUtil = require('./controllers/mongoUtil');

// Controllers
const subscribe = require('./controllers/subscribe');
const unsubscribe = require('./controllers/unsubscribe');
const send = require('./controllers/send');
const test = require('./controllers/test');

const app = express();

mongoUtil.connectToServer(() => {
  app.listen(process.env.PORT);
});

app.use(express.json());
app.use(cors());

app.post('/subscribe', subscribe);

app.get('/unsubscribe/:email/:id', unsubscribe);

app.post('/viewall', (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    const db = mongoUtil.getDb();
    return db.collection('subscribers').find().toArray()
      .then(subscribers => res.json(subscribers))
      .catch(() => res.sendStatus(500));
  }
  return res.sendStatus(400);
});

app.post('/viewemails', (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    const db = mongoUtil.getDb();
    return db.collection('subscribers').find({}, { projection: { _id: 0 } }).toArray()
      .then(subscribers => res.json(subscribers))
      .catch(() => res.sendStatus(500));
  }
  return res.sendStatus(400);
});

app.post('/send', send);

app.post('/test', test);
