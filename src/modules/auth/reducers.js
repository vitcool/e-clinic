import { handleActions } from 'redux-actions';
import {
  emailLoginRequest,
  emailLoginSuccess,
  emailLoginFailed,
  signupRequest,
  signupSuccess,
  signupFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed
} from './actions';

const defaultState = {
  isUserLogined: false,
  isLoginRequestPending: false,
  currentUser: {},
  isForgotPasswordRequestPending: false
};

export default handleActions(
  {
    [emailLoginRequest]: state => ({
      ...state,
      isLoginRequestPending: true,
      isUserLogined: false
    }),
    [emailLoginSuccess]: (state, { payload }) => ({
      ...state,
      isUserLogined: true,
      isLoginRequestPending: false,
      currentUser: payload.user
    }),
    [emailLoginFailed]: state => ({
      ...state,
      isUserLogined: false,
      isLoginRequestPending: false
    }),
    [signupRequest]: state => ({
      ...state,
      isSignupRequestPending: true
    }),
    [signupSuccess]: (state, { payload }) => ({
      ...state,
      isSignupRequestPending: false,
      currentUser: payload.user,
      isUserLogined: true
    }),
    [signupFailed]: state => ({
      ...state,
      isSignupRequestPending: false
    }),
    [forgotPasswordRequest]: state => ({
      ...state,
      isForgotPasswordRequestPending: true
    }),
    [forgotPasswordSuccess]: state => ({
      ...state,
      isForgotPasswordRequestPending: false
    }),
    [forgotPasswordFailed]: state => ({
      ...state,
      isForgotPasswordRequestPending: false
    })
  },
  defaultState
);
