const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.err(err)
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const readAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let note = JSON.parse(data);
            note = note.filter((note) => note.id !== id);
            writeToFile(file, note);
        }
    });
};

module.exports = { readFromFile, readAndAppend, readAndDelete };