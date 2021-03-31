const fs = require('fs');
const util = require('util');
// package to make unique id's for each note
const uuid = require('uuid/v1');

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
}