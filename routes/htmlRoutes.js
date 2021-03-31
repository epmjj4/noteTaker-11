const router = require('express').Router();
const path = require('path');

// makint the '/notes' page respond with the notes.html file in public
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

// all routes beside '/notes respond with the index.html file in public
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;