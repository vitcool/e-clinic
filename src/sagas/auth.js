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
import { generateKeyPair } from '../encryptDecrypt';
import {
  saveSecretKeyToAsyncStorage,
  getSecretKeyFromAsyncStorage
} from '../helpers/asyncStorage';
import { fromUint8ArrayToString } from '../helpers/encodeKeys';

function* emailLoginRequestWorker({ payload: { email, password } }) {
  try {
    const response = yield call(firebaseAuth.login, email, password);
    const { user } = response;
    const userClaimsResult = yield call(firebaseAuth.checkUserClaims);
    const isDoctor = userClaimsResult.claims.doctor;
    if (user) {
      const { uid: userUid } = user;
      const secretKey = yield getSecretKeyFromAsyncStorage(user.uid);
      const response = yield call(
        firebaseRealtimeDatabase.getUserData,
        userUid,
        isDoctor
      );
      const userData = response.val();
      yield put(
        emailLoginSuccess({
          user: { ...user, ...userData },
          isDoctor,
          secretKey
        })
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
    const { message } = e;
    yield put(emailLoginFailed({ message }));
    yield put(ToastActionsCreators.displayError(message, 2000));
  }
}

function* signupRequestWorker({
  payload: { email, password, name, surname, specialization, isDoctor }
}) {
  try {
    const response = yield call(firebaseAuth.signup, email, password);
    const { user } = response;
    const { uid: userUid } = user;

    const { publicKey, secretKey } = generateKeyPair();
    yield saveSecretKeyToAsyncStorage(userUid, secretKey);
    if (user) {
      let userData = {
        name,
        surname,
        email,
        publicKey: fromUint8ArrayToString(publicKey),
        secretKey: fromUint8ArrayToString(secretKey)
      };
      if (isDoctor) {
        yield call(firebaseAuth.addDoctorsClaim, email);
        userData = { ...userData, specialization };
      }
      const displayName = `${name} ${surname}`;
      yield call(firebaseAuth.updateProfileInfo, user, { displayName });
      yield call(
        firebaseRealtimeDatabase.writeUserData,
        userUid,
        userData,
        isDoctor
      );
      yield put(
        signupSuccess({
          user,
          isDoctor,
          secretKey: fromUint8ArrayToString(secretKey),
          publicKey: fromUint8ArrayToString(publicKey)
        })
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
    const { message } = e;
    yield put(signupFailed({ message }));
    yield put(ToastActionsCreators.displayError(message, 2000));
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
    const { message } = e;
    yield put(forgotPasswordFailed({ message }));
    yield put(ToastActionsCreators.displayError(message, 2000));
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
    const { message } = e;
    yield put(logoutFailed({ message }));
    yield put(ToastActionsCreators.displayError(message, 2000));
  }
}

function* authWatcher() {
  yield takeEvery(emailLoginRequest, emailLoginRequestWorker);
  yield takeEvery(signupRequest, signupRequestWorker);
  yield takeEvery(forgotPasswordRequest, forgotPasswordWorker);
  yield takeEvery(logoutRequest, logoutWorker);
}

export default authWatcher;
