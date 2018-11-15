import firebase from 'firebase';
import '@firebase/functions';
import { takeEvery, put, call } from 'redux-saga/effects';

import {
  emailLoginRequest,
  loginRequestSuccess,
  loginRequestFailed,
  signupRequest,
  signupRequestSuccess,
  signupRequestFailed
} from '../modules/auth/actions';

const firebaseLogin = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

const firebaseSignup = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

const firebaseAddDoctorsClaim = email => {
  const addDoctor = firebase.functions().httpsCallable('addDoctor');
  return addDoctor({ email });
};

const checkUserClaims = () => firebase.auth().currentUser.getIdTokenResult();

function* emailLoginRequestWorker({ payload: { email, password } }) {
  try {
    const response = yield call(firebaseLogin, email, password);
    const { user } = response;
    const userClaimsResult = yield call(checkUserClaims);
    console.log(userClaimsResult.claims.doctor);
    debugger;
    user
      ? yield put(loginRequestSuccess({ user }))
      : yield put(loginRequestFailed());
  } catch (e) {
    console.log(e);
  }
}

function* signupRequestWorker({ payload: { email, password, isDoctor } }) {
  try {
    const response = yield call(firebaseSignup, email, password);
    const { user } = response;
    if (user) {
      if (isDoctor) {
        const res = yield call(firebaseAddDoctorsClaim, email);
        console.log(res);
      }
      yield put(signupRequestSuccess({ user }));
    } else {
      yield put(signupRequestFailed());
    }
  } catch (e) {
    console.log(e);
  }
}

function* authWatcher() {
  yield takeEvery(emailLoginRequest, emailLoginRequestWorker);
  yield takeEvery(signupRequest, signupRequestWorker);
}

export default authWatcher;
