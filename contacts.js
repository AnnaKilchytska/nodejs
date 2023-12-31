const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactByID = async (id) => {
  const contacts = await listContacts();
  const contactID = String(id);
  const searchedContact = contacts.find((contact) => contact.id === contactID);
  return searchedContact || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const contactID = String(id);
  const index = contacts.findIndex((contact) => contact.id === contactID);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  contactsPath,
  listContacts,
  getContactByID,
  removeContact,
  addContact,
};
