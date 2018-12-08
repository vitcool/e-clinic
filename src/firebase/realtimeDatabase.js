import firebase from 'firebase';

export const writeUserData = (userId, data, isDoctor) => {
  const url = isDoctor ? 'doctors/' : 'users/';
  return firebase
    .database()
    .ref(`${url}${userId}`)
    .set({
      ...data
    });
};

export const getUserData = (userId, isDoctor) => {
  const url = isDoctor ? 'doctors/' : 'users/';
  return firebase
    .database()
    .ref(`${url}${userId}`)
    .once('value');
};

export const fetchUsers = () => {
  return firebase
    .database()
    .ref('users/')
    .once('value');
};

export const writeUpdatePrescription = (data, prescriptionId = null) => {
  debugger
  let prescriptionIdM = prescriptionId;
  if (!prescriptionIdM) {
    const { patientId, doctorId, publicData } = data;
    prescriptionIdM = firebase
      .database()
      .ref()
      .child('prescriptions')
      .push().key;
    firebase
      .database()
      .ref(`users/${patientId}/prescriptions`)
      .push({ key: prescriptionIdM, publicData });
    firebase
      .database()
      .ref(`doctors/${doctorId}/prescriptions`)
      .push({ key: prescriptionIdM, publicData });
  }
  const updates = {};
  updates[`/prescriptions/${prescriptionIdM}`] = data;
  return firebase
    .database()
    .ref()
    .update(updates);
};

export const fetchPrescriptions = (userId, isDoctor) => {
  const url = isDoctor ? 'doctors/' : 'users/';
  return firebase
    .database()
    .ref(`${url}${userId}/prescriptions`)
    .once('value');
};

export const fetchPrescription = prescriptionId => {
  return firebase
    .database()
    .ref(`prescriptions/${prescriptionId}`)
    .once('value');
};
