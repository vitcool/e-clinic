import { takeEvery, put } from 'redux-saga/effects';
import { initStart, initFinish } from '../modules/application/actions';

function* applicationWorker() {
  try {
    yield put(initFinish());
  } catch (e) {
    console.log(e);
  }
}

function* applicationWatcher() {
  yield takeEvery(initStart, applicationWorker);
}

export default applicationWatcher;
