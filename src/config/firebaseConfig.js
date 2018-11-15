import firebase from 'firebase';
import { FIREBASE_CONFIG_KEYS } from '../../keys';

let firebase_functions = {};

const initializeFirebase = () => {
  //   firebase.functions = functions;
  firebase.initializeApp(FIREBASE_CONFIG_KEYS);
};

export const firebaseFunctions = () => {
  return firebase_functions;
};

export default initializeFirebase;
