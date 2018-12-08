export const getUsersFetched = state => state.prescriptions.isFetchedSuccess;

export const getUsers = state => state.prescriptions.users;

export const getFetchUsersPending = state =>
  state.prescriptions.isFetchUsersRequestPending;

export const getCurrentPatient = state => state.prescriptions.currentPatient;

export const getPrescriptions = state => state.prescriptions.prescriptions;

export const getCurrentPrescription = state => state.prescriptions.currentPrescription;
