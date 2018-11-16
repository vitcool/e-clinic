import firebase from 'firebase';
import '@firebase/functions';

export const login = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signup = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const addDoctorsClaim = email => {
  const addDoctor = firebase.functions().httpsCallable('addDoctor');
  return addDoctor({ email });
};

export const forgotPassword = email =>
  firebase.auth().sendPasswordResetEmail(email);

export const checkUserClaims = () =>
  firebase.auth().currentUser.getIdTokenResult();
