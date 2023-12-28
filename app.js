const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sterling = require('./routes/sterling');


const app = express();

// Port number
const port = 3001;// Use while developing application
//const port = process.env.PORT || 8080;// Use this while deploying application to some server

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyParser.json());

// Uses routes specified in ./routes/sterling.js file
app.use('/sterling', sterling);

// Index route
app.get('/', (req, res) => {
  res.send('Build not completed.');
});

// Every Other route
app.get('*', (req, res) => {
    res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log('Server started on port :' + port);
});
