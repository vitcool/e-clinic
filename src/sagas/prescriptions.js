import { takeEvery, put, call, select } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';

import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailed,
  createPrescriptionRequest,
  createPrescriptionSuccess,
  createPrescriptionFailed,
  selectUserCreatePrescription,
  selectUserCreatePrescriptionSuccess,
  fetchPrescriptionsRequest,
  fetchPrescriptionsFailed,
  fetchPrescriptionsSuccess,
  selectPrescriptionSuccess,
  selectPrescriptionFailed,
  selectPrescription,
  uploadPrescriptionCommentRequest,
  uploadPrescriptionCommentSuccess,
  uploadPrescriptionCommentFailed,
  navigateDoctorToPrescriptionsList,
  navigateDoctorToPrescriptionsListSucccess
} from '../modules/prescriptions/actions';
import {
  getCurrentPatient,
  getCurrentPrescription
} from '../modules/prescriptions/selectors';

import * as firebaseRealtimeDatabase from './../firebase/realtimeDatabase';
import { getSecretKeyFromAsyncStorage } from '../helpers/asyncStorage';
import { getCurrentUser } from '../modules/auth/selectors';
import { encryptMessage, decryptMessage } from '../encryptDecrypt';
import {
  fromStringToUint8Array,
  fromUint8ArrayToString
} from '../helpers/encodeKeys';
import NavigationService from '../navigation/NavigationService';

function* fetchUsersRequestWorker() {
  try {
    const response = yield call(firebaseRealtimeDatabase.fetchUsers);
    const users = response.val();
    if (users !== null) {
      yield put(
        fetchUsersSuccess({
          users
        })
      );
      yield put(
        ToastActionsCreators.displayInfo('Users are fetched successfully', 2000)
      );
    } else {
      yield put(
        fetchUsersFailed({ message: 'fetchUsersRequestWorker - users is null' })
      );
    }
  } catch (e) {
    yield put(fetchUsersFailed({ message: `fetchUsersRequestWorker ${e}` }));
    yield put(ToastActionsCreators.displayError(e, 2000));
  }
}

function* createPrescriptionWorker({ payload: { secretData, publicData } }) {
  try {
    const {
      publicKey: patientPublicKey,
      //secretKey: patientSecretKey,
      id: patientId
    } = yield select(getCurrentPatient);
    const {
      uid: doctorId,
      publicKey: doctorPublicKey,
      secretKey: doctorsSecretKey
    } = yield select(getCurrentUser);
    //const doctorsSecretKey = yield getSecretKeyFromAsyncStorage(doctorId);
    const doctorsSecretKeyUint8Array = fromStringToUint8Array(doctorsSecretKey);
    const patientPublicKeyUint8Array = fromStringToUint8Array(patientPublicKey);
    const { box, nonce } = encryptMessage(
      doctorsSecretKeyUint8Array,
      patientPublicKeyUint8Array,
      secretData
    );
    const encryptedData = {
      box: fromUint8ArrayToString(box),
      nonce: fromUint8ArrayToString(nonce)
    };
    const data = {
      doctorId,
      doctorPublicKey,
      patientPublicKey,
      patientId,
      encryptedData,
      publicData
    };
    yield call(firebaseRealtimeDatabase.writeUpdatePrescription, data);
    yield put(createPrescriptionSuccess());
    yield put(
      ToastActionsCreators.displayInfo(
        `${publicData} prescription is created  successfully!`,
        2000
      )
    );
    NavigationService.navigateAndDisableBackButton('Dashboard');
  } catch (e) {
    yield put(
      createPrescriptionFailed({ message: `fetchUsersRequestWorker ${e}` })
    );
    yield put(ToastActionsCreators.displayError(e, 2000));
  }
}

function* fetchPrescriptionsWorker() {
  try {
    const { uid: userId, isDoctor } = yield select(getCurrentUser);
    const response = yield call(
      firebaseRealtimeDatabase.fetchPrescriptions,
      userId,
      isDoctor
    );
    const prescriptions = response.val();
    if (prescriptions !== null) {
      yield put(
        fetchPrescriptionsSuccess({
          prescriptions: prescriptions || []
        })
      );
      yield put(
        ToastActionsCreators.displayInfo(
          'Prescriptions are fetched successfully',
          2000
        )
      );
    } else {
      yield put(
        fetchUsersFailed({
          message: 'fetchPrescriptionsWorker - users is null'
        })
      );
    }
  } catch (e) {
    yield put(
      fetchPrescriptionsFailed({ message: `fetchUsersRequestWorker ${e}` })
    );
    yield put(ToastActionsCreators.displayError(e, 2000));
  }
}

function* selectUserCreatePrescriptionWorker() {
  yield put(selectUserCreatePrescriptionSuccess());
  NavigationService.navigate('Prescription');
}

function* selectPrescriptionWorker({
  payload: {
    currentPrescription: { key: currentPrescriptionId }
  }
}) {
  try {
    const response = yield call(
      firebaseRealtimeDatabase.fetchPrescription,
      currentPrescriptionId
    );
    const prescription = response.val();
    let decryptedData = null;
    let decryptedComment = null;
    if (prescription !== null) {
      const { doctorPublicKey, patientPublicKey } = prescription;
      const { /*uid: userId,*/ isDoctor, secretKey } = yield select(
        getCurrentUser
      );
      if (!isDoctor) {
        //const patientSecretKey = yield getSecretKeyFromAsyncStorage(userId);
        const doctorPublicKeyUint8Array = fromStringToUint8Array(
          doctorPublicKey
        );
        const patientSecretKeyUint8Array = fromStringToUint8Array(secretKey);
        const { box, nonce } = prescription.encryptedData;
        decryptedData = decryptMessage(
          doctorPublicKeyUint8Array,
          patientSecretKeyUint8Array,
          {
            box: fromStringToUint8Array(box),
            nonce: fromStringToUint8Array(nonce)
          }
        );
      } else {
        //const doctorsSecretKey = yield getSecretKeyFromAsyncStorage(userId);
        const patientPublicKeyUint8Array = fromStringToUint8Array(
          patientPublicKey
        );
        const doctorSecretKeyUint8Array = fromStringToUint8Array(secretKey);

        decryptedData = decryptMessage(
          patientPublicKeyUint8Array,
          doctorSecretKeyUint8Array,
          {
            box: fromStringToUint8Array(prescription.encryptedData.box),
            nonce: fromStringToUint8Array(prescription.encryptedData.nonce)
          }
        );

        decryptedComment = decryptMessage(
          patientPublicKeyUint8Array,
          doctorSecretKeyUint8Array,
          {
            box: fromStringToUint8Array(prescription.encryptedComment.box),
            nonce: fromStringToUint8Array(prescription.encryptedComment.nonce)
          }
        );
      }

      yield put(
        selectPrescriptionSuccess({
          currentPrescription: {
            ...prescription,
            secretData: decryptedData,
            comment: decryptedComment
          }
        })
      );
      NavigationService.navigate('Prescription');
    } else {
      yield put(
        selectPrescriptionFailed({
          message: 'selectPrescriptionWorker - prescription is null'
        })
      );
    }
  } catch (e) {
    yield put(
      selectPrescriptionFailed({ message: `selectPrescriptionWorker ${e}` })
    );
    yield put(ToastActionsCreators.displayError(e, 2000));
  }
}

function* uploadPrescriptionCommentWorker({ payload: { comment } }) {
  try {
    const {
      doctorPublicKey,
      patientPublicKey,
      patientId,
      secretData,
      publicData,
      doctorId,
      prescriptionId
    } = yield select(getCurrentPrescription);
    const patientSecretKey = yield getSecretKeyFromAsyncStorage(patientId);
    const patientSecretKeyUint8Array = fromStringToUint8Array(patientSecretKey);
    const doctorPublicKeyUint8Array = fromStringToUint8Array(doctorPublicKey);
    //!!!!only for test
    // const patientSecretKeyUint8Array = fromStringToUint8Array(patientSecretKey);
    // const doctorPublicKeyUint8Array = fromStringToUint8Array(doctorPublicKey);
    //!!!! finish only for test
    const encryptedCommentUint8 = encryptMessage(
      patientSecretKeyUint8Array,
      doctorPublicKeyUint8Array,
      comment
    );
    const encryptedComment = {
      box: fromUint8ArrayToString(encryptedCommentUint8.box),
      nonce: fromUint8ArrayToString(encryptedCommentUint8.nonce)
    };
    const secretDataUint8 = encryptMessage(
      patientSecretKeyUint8Array,
      doctorPublicKeyUint8Array,
      secretData
    );
    const encryptedData = {
      box: fromUint8ArrayToString(secretDataUint8.box),
      nonce: fromUint8ArrayToString(secretDataUint8.nonce)
    };
    const data = {
      doctorId,
      doctorPublicKey,
      patientPublicKey,
      patientId,
      encryptedData,
      publicData,
      encryptedComment
    };
    yield call(
      firebaseRealtimeDatabase.writeUpdatePrescription,
      data,
      prescriptionId
    );
    //debugger;
    //!!!!only for test
    // const decryptedData = decryptMessage(
    //   doctorPublicKeyUint8Array,
    //   patientSecretKeyUint8Array,
    //   encryptedData
    // );
    //!!!! finish only for test
    //debugger;
    //cont => send data to firebase!!!
    yield put(uploadPrescriptionCommentSuccess());
  } catch (e) {
    yield put(
      uploadPrescriptionCommentFailed({
        message: `uploadPrescriptionCommentWorker ${e}`
      })
    );
    yield put(ToastActionsCreators.displayError(e, 2000));
  }
}

function* navigateDoctorToPrescriptionsListWorker() {
  yield put(navigateDoctorToPrescriptionsListSucccess());
  NavigationService.navigate('PatientsDashboard');
}

function* prescriptionsWatcher() {
  yield takeEvery(fetchUsersRequest, fetchUsersRequestWorker);
  yield takeEvery(createPrescriptionRequest, createPrescriptionWorker);
  yield takeEvery(
    selectUserCreatePrescription,
    selectUserCreatePrescriptionWorker
  );
  yield takeEvery(fetchPrescriptionsRequest, fetchPrescriptionsWorker);
  yield takeEvery(selectPrescription, selectPrescriptionWorker);
  yield takeEvery(
    uploadPrescriptionCommentRequest,
    uploadPrescriptionCommentWorker
  );
  yield takeEvery(
    navigateDoctorToPrescriptionsList,
    navigateDoctorToPrescriptionsListWorker
  );
}

export default prescriptionsWatcher;
