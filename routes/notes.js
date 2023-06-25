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
