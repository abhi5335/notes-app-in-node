const yargs = require("yargs");
const chalk = require("chalk");

const notes = require("./notes.js");
const { string } = require("yargs");

//Notes : Add, Remove, Read, List

//Adding new notes!
yargs.command({
  command: "add",
  describe: "Use for adding a new notes!",
  builder: {
    title: {
      describe: "Notes Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body of the Notes",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

//Removing a notes
yargs.command({
  command: "remove",
  describe: "Use for removing an exisitng notes!",
  builder: {
    title: {
      describe: "title of notes to be removed!",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

//Listing a notes
yargs.command({
  command: "list",
  describe: "Lists all notes...!",
  handler() {
    notes.listNotes();
  },
});

//Reading a notes
yargs.command({
  command: "read",
  describe: "Use for reading an exisitng notes!",
  builder: {
    title: {
      describe: "title of notes to be read!",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

//console.log(yargs.argv)
yargs.parse();
