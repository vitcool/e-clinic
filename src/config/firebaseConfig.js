import firebase from 'firebase';
import { FIREBASE_CONFIG_KEYS } from '../../keys';

const initializeFirebase = () => {
  firebase.initializeApp(FIREBASE_CONFIG_KEYS);
};

export default initializeFirebase;
