import { handleActions } from 'redux-actions';
import { initStart, initFinish, nameUpdate } from './actions';

const defaultState = {
  isStarted: false,
  name: ''
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
    }),
    [nameUpdate]: (state, { payload }) => ({
      ...state,
      name: payload
    })
  },
  defaultState
);
