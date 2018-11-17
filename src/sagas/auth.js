import { takeEvery, put, call } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';

import {
  emailLoginRequest,
  emailLoginSuccess,
  emailLoginFailed,
  signupRequest,
  signupSuccess,
  signupFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed
} from '../modules/auth/actions';
import * as firebaseAuth from './../firebase/auth';
import * as firebaseRealtimeDatabase from './../firebase/realtimeDatabase';
import NavigationService from './../navigation/NavigationService';

function* emailLoginRequestWorker({ payload: { email, password } }) {
  try {
    const response = yield call(firebaseAuth.login, email, password);
    const { user } = response;
    const userClaimsResult = yield call(firebaseAuth.checkUserClaims);
    if (user) {
      yield put(
        emailLoginSuccess({ user, isDoctor: userClaimsResult.claims.doctor })
      );
      NavigationService.navigateAndDisableBackButton('Dashboard');
      yield put(
        ToastActionsCreators.displayInfo(
          'Heyya, you have logined successfully!',
          2000
        )
      );
    } else {
      yield put(emailLoginFailed());
    }
  } catch (e) {
    emailLoginFailed(e.message);
    yield put(ToastActionsCreators.displayError(e.message, 2000));
  }
}

function* signupRequestWorker({
  payload: { email, password, name, surname, specialization, isDoctor }
}) {
  try {
    const response = yield call(firebaseAuth.signup, email, password);
    const { user } = response;
    if (user) {
      let userData = { name, surname, email };
      if (isDoctor) {
        yield call(firebaseAuth.addDoctorsClaim, email);
        userData = { ...userData, specialization };
      }
      const userClaimsResult = yield call(firebaseAuth.checkUserClaims);
      const displayName = `${name} ${surname}`;
      yield call(firebaseAuth.updateProfileInfo, user, { displayName });
      yield call(firebaseRealtimeDatabase.writeUserData, user.uid, userData);
      yield put(
        signupSuccess({ user, isDoctor: userClaimsResult.claims.doctor })
      );
      yield put(
        ToastActionsCreators.displayInfo(
          'New account is created successfully.',
          2000
        )
      );
      NavigationService.navigateAndDisableBackButton('Dashboard');
    } else {
      yield put(signupFailed());
    }
  } catch (e) {
    yield put(signupFailed({ message: e.message }));
    yield put(ToastActionsCreators.displayError(e.message, 2000));
  }
}

function* forgotPasswordWorker({ payload: { email } }) {
  try {
    yield call(firebaseAuth.forgotPassword, email);
    yield put(forgotPasswordSuccess());
    yield put(
      ToastActionsCreators.displayInfo(
        `Email with reset password link have successfully sent to ${email}.Please check your mail.`,
        2000
      )
    );
    NavigationService.navigate('Login');
  } catch (e) {
    yield put(forgotPasswordFailed(e.message));
    yield put(ToastActionsCreators.displayError(e.message, 2000));
  }
}

function* logoutWorker() {
  try {
    yield call(firebaseAuth.logout);
    yield put(logoutSuccess());
    yield put(
      ToastActionsCreators.displayInfo('You have logouted successfully', 2000)
    );
    NavigationService.navigateAndDisableBackButton('Login');
  } catch (e) {
    yield put(logoutFailed(e.message));
  }
}

function* authWatcher() {
  yield takeEvery(emailLoginRequest, emailLoginRequestWorker);
  yield takeEvery(signupRequest, signupRequestWorker);
  yield takeEvery(forgotPasswordRequest, forgotPasswordWorker);
  yield takeEvery(logoutRequest, logoutWorker);
}

export default authWatcher;
