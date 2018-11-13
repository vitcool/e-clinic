import { createAction } from 'redux-actions';

export const emailLoginRequest = createAction('LOGIN_REQUEST');

export const loginRequestSuccess = createAction('LOGIN_SUCCESS');

export const loginRequestFailed = createAction('LOGIN_FAILED');

