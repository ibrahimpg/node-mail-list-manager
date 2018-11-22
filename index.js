const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  // code here
})

const port = process.env.PORT || 8080;

app.listen(port);