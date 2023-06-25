const express = require('express');
const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

const notesRouter = Router();

notesRouter.get('/', async (req, res) => {
  try {
    console.info(`${req.method} request received for the notes`);
    const data = await readFromFile('./db/db.json');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

notesRouter.get('/:note_id', async (req, res) => {
  try {
    const noteId = req.params.note_id;
    const data = await readFromFile('./db/db.json');
    const json = JSON.parse(data);
    const result = json.filter((note) => note.note_id === noteId);
    result.length > 0
      ? res.json(result)
      : res.json('No note with for that ID');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

notesRouter.delete('/:note_id', async (req, res) => {
  try {
    const noteId = req.params.note_id;
    const data = await readFromFile('./db/db.json');
    const json = JSON.parse(data);
    const result = json.filter((note) => note.id !== noteId);
    await writeToFile('./db/db.json', result);
    res.json(`Item ${noteId} got deleted`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

notesRouter.post('/', async (req, res) => {
  try {
    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };

      await readAndAppend(newNote, './db/db.json');
      res.json(`Note was added successfully`);
    } else {
      res.status(400).json('Error in adding this Note');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = notesRouter;

//This code sets up an Express router for handling note-related routes. It exports the router for use in other files.

//The express and Router modules are imported from express.
//The v4 method from the uuid module is imported as uuidv4.
//Several functions for file reading and writing are imported from the ../helpers/fsUtils module.
//A new instance of the router is created using Router().
//The router handles the following routes:
//GET /: Retrieves all notes from the db.json file and sends the data as a JSON response.
//GET /:note_id: Retrieves a specific note based on the provided note_id parameter, filters the notes based on the ID, and sends the result as a JSON response.
//DELETE /:note_id: Deletes a specific note based on the provided note_id parameter, filters the notes based on the ID, writes the updated data to the db.json file, and sends a JSON response indicating the deleted item.
//POST /: Creates a new note based on the request body containing title and text, generates a unique ID using uuidv4, appends the new note to the db.json file, and sends a JSON response indicating the successful addition of the note.
//Error handling is included using try-catch blocks. Any errors encountered during the execution of the route handlers will be caught, logged, and a 500 Server Error response will be sent.
//The router is exported for use in other files.
//In summary, this code defines a router that handles various CRUD operations for notes, including retrieving all notes, retrieving a specific note, deleting a note, and creating a new note.