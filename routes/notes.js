const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid')

// Read notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Add new note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            // This id is used to display or delete the correct note
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.errored('Error adding note');
    }
});

// Delete note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readAndDelete(noteId, './db/db.json');
    res.json(`Note ${noteId} has been deleted`);
})

module.exports = notes;