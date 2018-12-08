import { createAction } from 'redux-actions';

export const fetchUsersRequest = createAction('FETCH_USERS_REQUEST');

export const fetchUsersSuccess = createAction('FETCH_USERS_SUCCESS');

export const fetchUsersFailed = createAction('FETCH_USERS_FAILED');

export const selectUserCreatePrescription = createAction(
  'SELECT_USER_CREATE_PRESCRIPTION'
);

export const selectUserCreatePrescriptionSuccess = createAction(
  'SELECT_USER_CREATE_PRESCRIPTION_SUCCESS'
);

export const createPrescriptionRequest = createAction(
  'CREATE_PRESCRIPTION_REQUEST'
);

export const createPrescriptionSuccess = createAction(
  'CREATE_PRESCRIPTION_SUCCESS'
);

export const createPrescriptionFailed = createAction(
  'CREATE_PRESCRIPTION_FAILED'
);

export const fetchPrescriptionsRequest = createAction(
  'FETCH_PRESCRIPTIONS_REQUEST'
);

export const fetchPrescriptionsSuccess = createAction(
  'FETCH_PRESCRIPTIONS_SUCCESS'
);

export const fetchPrescriptionsFailed = createAction(
  'FETCH_PRESCRIPTIONS_FAILED'
);

export const selectPrescription = createAction('SELECT_PERSCRIPTION');

export const selectPrescriptionSuccess = createAction(
  'SELECT_PERSCRIPTION_SUCCESS'
);

export const selectPrescriptionFailed = createAction(
  'SELECT_PERSCRIPTION_FAILED'
);

export const uploadPrescriptionCommentRequest = createAction(
  'UPLOAD_PRESCRIPTION_COMMENT_REQUEST'
);

export const uploadPrescriptionCommentSuccess = createAction(
  'UPLOAD_PRESCRIPTION_COMMENT_SUCCESS'
);

export const uploadPrescriptionCommentFailed = createAction(
  'UPLOAD_PRESCRIPTION_COMMENT_FAILED'
);

export const navigateDoctorToPrescriptionsList = createAction(
  'NAVIGATE_DOCTOR_TO_PRESCRIPTIONS_LIST'
);

export const navigateDoctorToPrescriptionsListSucccess = createAction(
  'NAVIGATE_DOCTOR_TO_PRESCRIPTION_LIST_SUCCESS'
);
