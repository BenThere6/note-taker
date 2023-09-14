const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const notesRouter = require('./routes/notes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/notes', notesRouter);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () => {
    console.log('App listening at PORT ' + PORT)
});