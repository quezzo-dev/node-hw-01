import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import {listContacts, getContactById, removeContact, addContact} from './contacts.js'

const argv = yargs(hideBin(process.argv)).argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
     listContacts();
      break;

    case 'get':
      getContactById(id);
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('Unknown action type!');
  }
}

invokeAction(argv);