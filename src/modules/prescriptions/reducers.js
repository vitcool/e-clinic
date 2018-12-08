import { handleActions } from 'redux-actions';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailed,
  selectUserCreatePrescription,
  createPrescriptionRequest,
  createPrescriptionSuccess,
  createPrescriptionFailed,
  fetchPrescriptionsRequest,
  fetchPrescriptionsSuccess,
  fetchPrescriptionsFailed,
  selectPrescription,
  selectPrescriptionSuccess,
  selectPrescriptionFailed,
  uploadPrescriptionCommentRequest,
  uploadPrescriptionCommentFailed,
  uploadPrescriptionCommentSuccess
} from './actions';

const defaultState = {
  users: []
};

export default handleActions(
  {
    [fetchUsersRequest]: state => ({
      ...state,
      isFetchUsersRequestPending: true,
      isFetchedSuccess: false
    }),
    [fetchUsersSuccess]: (state, { payload }) => ({
      ...state,
      isFetchedSuccess: true,
      isFetchUsersRequestPending: false,
      users: {
        ...payload.users
      }
    }),
    [fetchUsersFailed]: (state, { payload }) => ({
      ...state,
      isFetchedSuccess: false,
      isFetchUsersRequestPending: false,
      fetchUserErrorMessage: payload.message
    }),
    [selectUserCreatePrescription]: (state, { payload }) => ({
      ...state,
      currentPatient: payload.currentPatient
    }),
    [createPrescriptionRequest]: state => ({
      ...state
    }),
    [createPrescriptionSuccess]: state => ({
      ...state
    }),
    [createPrescriptionFailed]: state => ({
      ...state
    }),
    [fetchPrescriptionsRequest]: state => ({
      ...state
    }),
    [fetchPrescriptionsSuccess]: (state, { payload }) => ({
      ...state,
      prescriptions: {
        ...payload.prescriptions
      }
    }),
    [fetchPrescriptionsFailed]: (state, { payload }) => ({
      ...state,
      fetchPrescriptionsErrorMessage: payload.message
    }),
    [selectPrescription]: (state, { payload }) => ({
      ...state,
      currentPrescription: payload.currentPrescription
    }),
    [selectPrescriptionSuccess]: (state, { payload }) => ({
      ...state,
      currentPrescription: {...payload.currentPrescription, prescriptionId: state.currentPrescription.key}
    }),
    [selectPrescriptionFailed]: (state, { payload }) => ({
      ...state,
      selectPrescriptionErrorMessage: payload.message
    }),
    [uploadPrescriptionCommentRequest]: (state) => ({
      ...state,
      uploadPrescriptionCommentPending: true
    }),
    [uploadPrescriptionCommentSuccess]: (state) => ({
      ...state,
      uploadPrescriptionCommentPending: false,
      uploadPrescriptionCommentSuccess: true
    }),
    [uploadPrescriptionCommentFailed]: (state, { payload }) => ({
      ...state,
      uploadPrescriptionCommentPending: false,
      uploadPrescriptionCommentErrorMessage: payload.message
    })
  },
  defaultState
);
