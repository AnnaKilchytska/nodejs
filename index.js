const contacts = require("./contacts");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

// index.js
const argv = require("yargs").argv;

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactByID(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const oldContact = await contacts.removeContact(id);
      console.log(oldContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// const arr = hideBin(process.argv);
// const argv = yargs(arr);

invokeAction(argv);
