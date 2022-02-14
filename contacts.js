import fs from 'fs/promises';
import * as path from "path";
import shortid from 'shortid';
import createDirnameAndFileName from './lib/dirname.js';
import { handleError } from "./lib/handleError.js";

const { __dirname } = createDirnameAndFileName(import.meta.url);
const contactsPath = path.join(`${__dirname}`, "/db/contacts.json");

const readFile = path =>
  fs.readFile(path, 'utf8', (error, data) => {
    if (error)
      throw error;
    return data;
  });

export async function listContacts() {
     try {
    const list = await readFile(contactsPath);

    console.log('Contacts:');
    console.table(JSON.parse(list));

    return JSON.parse(list);
  } catch (err) {
    handleError(error);
  }
}

export async function getContactById(contactId) {
    try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);

    console.log(`Contact with ID ${contactId}`);
    console.table(contact);

  } catch (error) {
    handleError(error);
  }
}

export async function removeContact(contactId) {
    try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId,
    );

    console.log(`Contact with ID ${contactId} removed`);
    console.table(updatedContacts);

  } catch (error) {
    handleError(error);
  }
}

export async function addContact(name, email, phone) {
     try {
    const contacts = await listContacts();
    const id = shortid();
    const newContactsList = [...contacts, { id, name, email, phone }];

    console.log(`Contact ${name} added`);
    console.table(newContactsList);

  } catch (error) {
    handleError(error);
  }
}