import firebase from 'firebase';

export const writeUserData = (userId, data) => {
  return firebase
    .database()
    .ref('users/' + userId)
    .set({
      ...data
    });
};
