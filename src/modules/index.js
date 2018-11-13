import { combineReducers } from 'redux';
import application from './application';
import auth from './auth';

const rootReducer = combineReducers({
  application,
  auth
});

export default rootReducer;
