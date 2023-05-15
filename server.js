//Install express server
const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');

app.use(cors());


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/magic-land-UI'));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/magic-land-UI/index.html'));
});

app.post('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/magic-land-UI/index.html'));
});


import jwt from 'jsonwebtoken';

const token = localStorage.getItem('jwt_token'); // sau de unde ați obținut token-ul
const secret = 'secret_key'; // cheia secretă folosită pentru semnarea token-ului

jwt.verify(token, secret, (err, decodedToken) => {
  if (err) {
    console.log('Token invalid:', err);
  } else {
    console.log('Token valid:', decodedToken);
  }
});


app.listen(process.env.PORT || 8080);
