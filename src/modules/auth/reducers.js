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
  forgotPasswordFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed
} from './actions';

const defaultState = {
  isUserLogined: false,
  isLoginRequestPending: false,
  currentUser: {},
  isForgotPasswordRequestPending: false,
  isSignupRequestPending: false
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
      currentUser: { ...payload.user, isDoctor: payload.isDoctor }
    }),
    [emailLoginFailed]: (state, { payload }) => ({
      ...state,
      isUserLogined: false,
      isLoginRequestPending: false,
      emailLoginErrorMessage: payload.message
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
    [signupFailed]: (state, { payload }) => ({
      ...state,
      isSignupRequestPending: false,
      signupErrorMessage: payload.message
    }),
    [forgotPasswordRequest]: state => ({
      ...state,
      isForgotPasswordRequestPending: true
    }),
    [forgotPasswordSuccess]: state => ({
      ...state,
      isForgotPasswordRequestPending: false
    }),
    [forgotPasswordFailed]: (state, { payload }) => ({
      ...state,
      isForgotPasswordRequestPending: false,
      forgotPasswordErrorMessage: payload.message
    }),
    [logoutRequest]: state => ({
      ...state,
      isLogoutRequestPending: true
    }),
    [logoutSuccess]: state => ({
      ...state,
      isUserLogined: false,
      isLogoutRequestPending: false,
      currentUser: defaultState.currentUser
    }),
    [logoutFailed]: state => ({
      ...state,
      isUserLogined: true,
      isLogoutRequestPending: false
    })
  },
  defaultState
);
