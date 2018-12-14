import { takeEvery, put } from 'redux-saga/effects';
import sizeof from 'object-sizeof';

import {
  gotoComparingScreen,
  gotoComparingScreenSuccess,
  encryptMessage,
  encryptMessageSuccess
} from '../modules/comparing/actions';
import NavigationService from '../navigation/NavigationService';
import {
  encryptDecryptTweetNacl,
  encryptDecryptReactNativeRsa
} from '../encryptDecrypt';

function* gotoComparingScreenWorker() {
  try {
    NavigationService.navigate('Comparing');
    yield put(gotoComparingScreenSuccess());
  } catch (e) {
    console.log(e);
  }
}

function* encryptMessageWorker({ payload: { text } }) {
  try {
    let elapse = { size: sizeof(text) };
    elapse.twetNacl = encryptDecryptTweetNacl(text);
    elapse.rnRsa = encryptDecryptReactNativeRsa(text);
    yield put(encryptMessageSuccess({ elapse }));
  } catch (e) {
    console.log(e);
  }
}

function* comapringWatcher() {
  yield takeEvery(gotoComparingScreen, gotoComparingScreenWorker);
  yield takeEvery(encryptMessage, encryptMessageWorker);
}

export default comapringWatcher;
