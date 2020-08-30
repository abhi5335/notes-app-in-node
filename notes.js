const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
  const notes = loadNotes();
  //const dupTitleCheck = notes.filter((note) => note.title === title);
  const dupNotes = notes.find((note) => note.title === title);

  //Works only when we have inspect or --inspect-brk option passed for the node command!
  debugger

  if (!dupNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New Notes Added!"));
  } else {
    console.log(chalk.red.inverse("Title Already Taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToSave = notes.filter((note) => note.title !== title);
  if (notes.length === notesToSave.length) {
    console.log(chalk.bgRed("No notes found!"));
  } else {
    saveNotes(notesToSave);
    console.log(chalk.bgBlue("Note Removed"));
  }
};

const listNotes = () => {
  const allNotes = loadNotes();
  console.log(chalk.green("Your Notes :: "));
  allNotes.forEach((element) => {
    console.log("Title : " + element.title + " , " + " Body : " + element.body);
  });
};

const readNote = (title) => {
  const allNotes = loadNotes();
  const noteFound = allNotes.find((note) => note.title === title);
  if (!noteFound) {
    console.log(chalk.bgRed("No notes found with given title"));
  } else {
    console.log(chalk.green("Your Notes ::"));
    console.log(
      "Title : " +
        chalk.yellowBright(noteFound.title) +
        " , \n" +
        "Body : " +
        noteFound.body
    );
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};

module.exports = {
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
