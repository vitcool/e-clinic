import { combineReducers } from 'redux';
import { toastReducer as toast } from 'react-native-redux-toast';

import application from './application';
import auth from './auth';
import prescriptions from './prescriptions';

const rootReducer = combineReducers({
  application,
  auth,
  prescriptions,
  toast
});

export default rootReducer;
