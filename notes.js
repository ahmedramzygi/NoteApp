const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
   
    const duplicateNote=notes.find((note)=> note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}
const listNote=()=>{
    const notes=loadNotes();
    console.log(chalk.inverse("Your Notes are "))
    notes.forEach(note => {
        console.log(note.title);
    });


}

const readNote=(title)=>{
    const notes=loadNotes();
    const Fnote=notes.find((note)=> note.title === title);
    if(Fnote)
    {
        console.log(chalk.green(Fnote.title));
        console.log(Fnote.body);

    }
    else{
        console.log(chalk.red.inverse('Cant find the note'));
    }

}
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote:listNote,
    readNote:readNote 
}