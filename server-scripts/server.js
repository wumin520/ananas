/* eslint-disable */
const express = require('express');
const path = require('path');

const app = express();

// app.use(express.static('../dist'))

app.use('/', express.static(path.join(__dirname, '..', 'dist/')));
const indexPath = path.join(__dirname, '..', 'dist/index.html');

app.get('/', function(req, res) {
  res.sendFile(indexPath);
});

app.listen(9000, error => {
  if (!error) {
    console.log('listening on port 9000');
  }
});
