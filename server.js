const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js')

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// / gets directed to index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// /notes gets directed to notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// Anything else gets redirected to homepage
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () => console.log('App listening at PORT ' + PORT));