const express = require('express');
const bodyParser = require('body-parser');
// const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.use(express.static('client/public'));
app.use(express.static('client/build'));

app.get('/', (req, res) => {
  console.log('GET request for Home');

  res.sendFile('index.html');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
