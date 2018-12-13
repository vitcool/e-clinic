import { handleActions } from 'redux-actions';
import {
  createPrescriptionsList,
  scheduleProccessedSuccessfully
} from './actions';

const defaultState = {
  isPrescriptionListPerforming: false,
  prescriptionsList: []
};

export default handleActions(
  {
    [createPrescriptionsList]: state => ({
      ...state,
      isPrescriptionListPerforming: true
    }),
    [scheduleProccessedSuccessfully]: (state, { payload }) => ({
      ...state,
      prescriptionsList: payload.schedule,
      isPrescriptionListPerforming: false
    })
  },
  defaultState
);
