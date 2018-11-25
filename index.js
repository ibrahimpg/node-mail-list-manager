// Packages
const express = require('express');
const cors = require('cors');

// MongoDB Connection Module
const mongoUtil = require('./config/database');

// Controllers
const subscribe = require('./controllers/subscribe');
const unsubscribe = require('./controllers/unsubscribe');
const send = require('./controllers/send');
const test = require('./controllers/test');
const view = require('./controllers/view');

const app = express();

mongoUtil.connectToServer()
  .then(() => app.listen(process.env.PORT))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors());

app.post('/subscribe', subscribe);

app.get('/unsubscribe/:email/:id', unsubscribe);

app.post('/view', view);

app.post('/send', send);

app.post('/test', test);
