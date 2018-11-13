import { createAction } from 'redux-actions';

export const emailLoginRequest = createAction('LOGIN_REQUEST');

export const loginRequestSuccess = createAction('LOGIN_SUCCESS');

export const loginRequestFailed = createAction('LOGIN_FAILED');

export const signupRequest = createAction('SIGNUP_REQUEST');

export const signupRequestSuccess = createAction('SIGNUP_REQUEST_SUCCESS');

export const signupRequestFailed = createAction('SIGNUP_REQUEST_FAILED');


