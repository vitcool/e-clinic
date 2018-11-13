import firebase from 'firebase';
import { takeEvery, put, call } from 'redux-saga/effects';
import {
  emailLoginRequest,
  loginRequestSuccess,
  loginRequestFailed
} from '../modules/auth/actions';

const firebaseSignUp = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

function* emailLoginRequestWorker({ payload: { email, password } }) {
  try {
    const response = yield call(firebaseSignUp, email, password);
    const { user } = response;
    user
      ? yield put(loginRequestSuccess({ user }))
      : yield put(loginRequestFailed());
  } catch (e) {
    console.log(e);
  }
}

function* authWatcher() {
  yield takeEvery(emailLoginRequest, emailLoginRequestWorker);
}

export default authWatcher;
