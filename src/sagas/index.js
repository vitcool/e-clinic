import { all } from 'redux-saga/effects';
import application from './application';

export default function* rootSaga() {
  yield all([application()]);
}
