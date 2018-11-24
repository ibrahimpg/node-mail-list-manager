/* eslint-disable no-console */

// Packages
const express = require('express');
// const nodemailer = require('nodemailer');
const cors = require('cors');

// MongoDB Connection Module
const mongoUtil = require('./controllers/mongoUtil');

const database = mongoUtil.getDb();

// Controllers
const subscribe = require('./controllers/subscribe');
const unsubscribe = require('./controllers/unsubscribe');
// const send = require('./controllers/send');
// const test = require('./controllers/test');

// let db;

const app = express();

mongoUtil.connectToServer(() => {
  app.listen(process.env.PORT);
});

// mongodb.MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
//   .then((database) => {
//     db = database.db();
//     app.listen(process.env.PORT);
//   })
//   .catch(err => console.log(err));

app.use(express.json());
app.use(cors());

app.post('/subscribe', subscribe);

app.get('/unsubscribe/:email/:id', unsubscribe);

// app.post('/send', send);

// app.post('/test', test);

app.post('/viewall', (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    console.log(database);
    return database.db().collection('subscribers').find().toArray()
      .then(subscribers => res.json(subscribers))
      .catch(() => res.sendStatus(500));
  }
  return res.sendStatus(400);
});

// app.post('/', (req, res) => {
//   const transporter = nodemailer.createTransport({
//     service: 'Outlook365',
//     auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
//   });
//   transporter.sendMail({
//     from: `"${process.env.ORG_NAME}" <${process.env.EMAIL_ADDRESS}>`,
//     to: req.body.email,
//     subject: req.body.subject,
//     text: `
// ${req.body.message}
// // Unsubscribe link here. <URL>/user email/user id
// `,
//   })
//     .then(() => res.sendStatus(200))
//     .catch(() => res.sendStatus(500));
// });

// Test route that sends the email to the env var email
