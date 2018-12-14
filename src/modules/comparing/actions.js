import { createAction } from 'redux-actions';

export const gotoComparingScreen = createAction('GO_TO_COMPARING_SCREEN');

export const gotoComparingScreenSuccess = createAction(
  'GO_TO_COMPARING_SCREEN_SUCCESS'
);

export const encryptMessage = createAction('ENCRYPT_MESSAGE');

export const encryptMessageSuccess = createAction('ENCRYPT_MESSAGe_SUCCESS');
