const router = require('express').Router();
const log = require('../db/log');

// GET rout for '/api/notes' and renders all notes in the db.json file

router.get('/notes', (req, res) => {
    log.getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.json(err));
});

//POST route for '/notes' page to write notes to the db.json file

router.post('/notes', (req, res) => {
    //use req.body to add the title, input, and id
    log.addNotes(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.json(err));
});

//DELETE route for 'api/notes'
router.delete('/notes/:id', (req, res) => {
log.deleteNote(req.params.id)
.then(() => res.json( {ok: true}))
.catch ((err) => res.json(err));
});

module.exports = router;