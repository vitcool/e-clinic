import { handleActions } from 'redux-actions';
import {
  emailLoginRequest,
  loginRequestSuccess,
  loginRequestFailed
} from './actions';

const defaultState = {
  isUserlogined: false,
  isLoginRequestPending: false,
  currentUser: {}
};

export default handleActions(
  {
    [emailLoginRequest]: state => ({
      ...state,
      isLoginRequestPending: true,
      isUserlogined: false
    }),
    [loginRequestSuccess]: (state, { payload }) => ({
      ...state,
      isUserlogined: true,
      isLoginRequestPending: false,
      currentUser: payload.user
    }),
    [loginRequestFailed]: state => ({
      ...state,
      isUserlogined: false,
      isLoginRequestPending: false
    })
  },
  defaultState
);
