const fs = require('fs');
const util = require('util');
// package to make unique id's for each note
//const uuid = require('uuid');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid')

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

//make a class to make methods to use in the routes folder

class Log {
    read() {
        //read files in the db.json and encode them in utf8(for browswers)
        return readFile('db/db.json', 'utf8');
    }

    //writes files in the db.json and converts them in JSON format
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note))
    }
//./db.json
    getNotes() {
        return this.read().then(notes => {
            let noteParser;
            // if the logged notes aren't in arrays, return an empty array
            try {
                noteParser = [].concat(JSON.parse(notes))
            } catch (err) {
                noteParser = [];
            }

            return noteParser
        })
    }

    // method to add notes to the db.json file
addNotes(note){
const { title, input } = note;
// assign a unique id to the body of the newNote using uuid - https://www.npmjs.com/package/uuid
const newNote = { title, input, id: uuidv4()};

//Get all notes from the db.json files
return this.getNotes()
// Add the new note
.then(notes => [...notes, newNote])
// Write the updated notes
.then(updateNotes => this.write(updateNotes))
//return the new note
.then(() => newNote)
}

// method to add notes from db.json file
deleteNote(id){
    return this.getNotes()
    .then(notes => notes.filter(note => note.id !== id))
    .then(filterNotes => this.write(filterNotes));
}

}

module.exports = new Log();