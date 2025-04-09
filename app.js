const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Welcome to LectoTrack API!');
});

module.exports = app; // Export the app for testing 