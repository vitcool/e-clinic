import { handleActions } from 'redux-actions';
import {
  emailLoginRequest,
  loginRequestSuccess,
  loginRequestFailed,
  signupRequest,
  signupRequestSuccess,
  signupRequestFailed
} from './actions';

const defaultState = {
  isUserLogined: false,
  isLoginRequestPending: false,
  currentUser: {}
};

export default handleActions(
  {
    [emailLoginRequest]: state => ({
      ...state,
      isLoginRequestPending: true,
      isUserLogined: false
    }),
    [loginRequestSuccess]: (state, { payload }) => ({
      ...state,
      isUserLogined: true,
      isLoginRequestPending: false,
      currentUser: payload.user
    }),
    [loginRequestFailed]: state => ({
      ...state,
      isUserLogined: false,
      isLoginRequestPending: false
    }),
    [signupRequest]: state => ({
      ...state,
      isSignupRequestPending: true
    }),
    [signupRequestSuccess]: (state, { payload }) => ({
      ...state,
      isSignupRequestPending: false,
      currentUser: payload.user,
      isUserLogined: true
    }),
    [signupRequestFailed]: state => ({
      ...state,
      isSignupRequestPending: false
    })
  },
  defaultState
);
