import { createAction } from 'redux-actions';

export const emailLoginRequest = createAction('LOGIN_REQUEST');

export const emailLoginSuccess = createAction('LOGIN_SUCCESS');

export const emailLoginFailed = createAction('LOGIN_FAILED');

export const signupRequest = createAction('SIGNUP_REQUEST');

export const signupSuccess = createAction('SIGNUP_SUCCESS');

export const signupFailed = createAction('SIGNUP_FAILED');

export const forgotPasswordRequest = createAction('FORGOT_PASSWORD_REQUEST');

export const forgotPasswordSuccess = createAction('FORGOT_PASSWORD_SUCCESS');

export const forgotPasswordFailed = createAction('FORGOT_PASSWORD_FAILED');

export const logoutRequest = createAction('LOGOUT_REQUEST')

export const logoutSuccess = createAction('LOGOUT_SUCCESS');

export const logoutFailed = createAction('LOGOUT_FAILED');
