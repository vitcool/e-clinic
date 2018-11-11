import { createAction } from 'redux-actions';

export const initStart = createAction('INIT_START');

export const initFinish = createAction('INIT_FINISH');

export const nameUpdate = createAction('NAME_UPDATE');
