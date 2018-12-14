import { handleActions } from 'redux-actions';
import { encryptMessageSuccess, encryptMessage } from './actions';

const defaultState = {
  elapse: {},
  isComparingPerforming: false
};

export default handleActions(
  {
    [encryptMessage]: state => ({
      ...state,
      isComparingPerforming: true
    }),
    [encryptMessageSuccess]: (state, { payload }) => ({
      ...state,
      elapse: payload.elapse,
      isComparingPerforming: false
    })
  },
  defaultState
);
