import { takeEvery, put, call } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import {
  emailLoginRequest,
  emailLoginSuccess,
  emailLoginFailed,
  signupRequest,
  signupSuccess,
  signupFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed
} from '../modules/auth/actions';
import * as firebaseCalls from './../firebase/auth';

function* emailLoginRequestWorker({ payload: { email, password } }) {
  try {
    const response = yield call(firebaseCalls.login, email, password);
    const { user } = response;
    const userClaimsResult = yield call(firebaseCalls.checkUserClaims);
    // handle if user is doctor - userClaimsResult.claims.doctor
    user
      ? yield put(emailLoginSuccess({ user }))
      : yield put(emailLoginFailed());
  } catch (e) {
    //handle exception
    emailLoginFailed(e);
  }
}

function* signupRequestWorker({ payload: { email, password, isDoctor } }) {
  try {
    const response = yield call(firebaseCalls.signup, email, password);
    const { user } = response;
    if (user) {
      if (isDoctor) {
        yield call(firebaseCalls.addDoctorsClaim, email);
      }
      yield put(signupSuccess({ user }));
    } else {
      yield put(signupFailed());
    }
  } catch (e) {
    yield put(signupFailed(e));
  }
}

function* forgotPasswordWorker({ payload: { email } }) {
  try {
    yield call(firebaseCalls.forgotPassword, email);
    yield put(forgotPasswordSuccess());
    //the following line looks like not working!
    yield put(NavigationActions.navigate({ routeName: 'Login' }));
  } catch (e) {
    yield put(forgotPasswordFailed(e));
  }
}

function* authWatcher() {
  yield takeEvery(emailLoginRequest, emailLoginRequestWorker);
  yield takeEvery(signupRequest, signupRequestWorker);
  yield takeEvery(forgotPasswordRequest, forgotPasswordWorker);
}

export default authWatcher;
