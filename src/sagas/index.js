import { all } from 'redux-saga/effects';
import application from './application';
import auth from './auth';
import prescriptions from './prescriptions';
import prescriptionsList from './prescriptionsList';

export default function* rootSaga() {
  yield all([application(), auth(), prescriptions(), prescriptionsList()]);
}
