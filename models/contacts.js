// const fs = require('fs/promises')

const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");
// contacts.js

const contactsPath = path.join(__dirname, "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
}

async function addContact({ name, email, phone }) {
  const data = { id: uniqid(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(data);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return data;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  let count = 0;
  contacts.forEach((contact) => {
    if (contact.id === contactId) {
      count = count + 1;
      if (body.name) {
        contact.name = body.name;
      }
      if (body.email) {
        contact.email = body.email;
      }
      if (body.phone) {
        contact.phone = body.phone;
      }
    }
  });
  if (!count) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts.find((contact) => contact.id === contactId);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
