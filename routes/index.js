const express = require('express');

const notesRouter = require('./notes');

const app = express();

// Directs to the notes.js file
app.use('/notes', notesRouter);

module.exports = app;