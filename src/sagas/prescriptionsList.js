import _ from 'lodash';
import { takeEvery, put, select, call, all } from 'redux-saga/effects';

import {
  createPrescriptionsList,
  scheduleProccessedSuccessfully
} from '../modules/prescriptionsList/actions';
import { getPrescriptions } from '../modules/prescriptions/selectors';
import * as firebaseRealtimeDatabase from './../firebase/realtimeDatabase';
import { decryptMessage } from '../encryptDecrypt';
import { getCurrentUser } from '../modules/auth/selectors';
import { fromStringToUint8Array } from '../helpers/encodeKeys';
import { generateSchedule } from '../helpers/processSchedule';
import NavigationService from '../navigation/NavigationService';
function* createPrescriptionsListWorker() {

  try {
    const prescriptions = yield select(getPrescriptions);
    const prescriptionsData = yield all(
      _.map(prescriptions, prescription => {
        return call(
          firebaseRealtimeDatabase.fetchPrescription,
          prescription.key
        );
      })
    );
    const prescriptionsValues = _.filter(
      _.map(prescriptionsData, prescription => prescription.val()),
      prescription => prescription.pillsSchedule
    );
    const { secretKey } = yield select(getCurrentUser);
    const prescriptionsList = _.map(prescriptionsValues, prescriptionsValue => {
      const { doctorPublicKey } = prescriptionsValue;
      const { box, nonce } = prescriptionsValue.pillsSchedule;
      const doctorPublicKeyUint8Array = fromStringToUint8Array(doctorPublicKey);
      const patientSecretKeyUint8Array = fromStringToUint8Array(secretKey);
      return JSON.parse(
        decryptMessage(doctorPublicKeyUint8Array, patientSecretKeyUint8Array, {
          box: fromStringToUint8Array(box),
          nonce: fromStringToUint8Array(nonce)
        })
      );
    });
    const prescriptionsListArray = _.filter(
      [].concat(...prescriptionsList),
      i => i.title != ''
    );
    const schedule = generateSchedule(prescriptionsListArray);
    yield put(
      scheduleProccessedSuccessfully({
        schedule
      })
    );
    NavigationService.navigate('Schedule');
  } catch (e) {
    console.log(e);
  }
}

function* applicationWatcher() {
  yield takeEvery(createPrescriptionsList, createPrescriptionsListWorker);
}

export default applicationWatcher;
