import { handleActions } from 'redux-actions';
import { initStart, initFinish } from './actions';

const defaultState = {
  isStarted: false
};

export default handleActions(
  {
    [initStart]: state => ({
      ...state,
      isStarted: false
    }),
    [initFinish]: state => ({
      ...state,
      isStarted: true
    })
  },
  defaultState
);
