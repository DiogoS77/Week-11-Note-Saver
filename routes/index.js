const express = reqiore('express');

const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;