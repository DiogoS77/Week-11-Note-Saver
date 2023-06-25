const express = require('express');
const { Router } = require('express');
const uuid = require('uuid');
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
    const result = json.filter((note) => note.tip_id === tipID);
    result.length > 0
      ? res.json(result)
      : res.json('No note with for that ID');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


