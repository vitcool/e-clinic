import { all } from 'redux-saga/effects';
import application from './application';
import auth from './auth';

export default function* rootSaga() {
  yield all([application(), auth()]);
}
