const express = require('express');

const notesRouter = require('./notes.js');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;

//This code sets up an Express application and exports it for use in other files.

//The express module is imported.
//The router module defined in notes.js is imported as notesRouter.
//An instance of the Express application is created using express().
//The application uses the notesRouter for handling routes starting with /notes. 
//This means that any requests with paths starting with /notes will be forwarded to the notesRouter for further handling.
//The application is exported for use in other files.
//In summary, this code sets up an Express application that uses the notesRouter for handling routes related to notes. 
//It allows you to define additional routes and middleware in other files and plug them into the application as needed.