import { combineReducers } from 'redux';
import { toastReducer as toast } from 'react-native-redux-toast';

import application from './application';
import auth from './auth';
import prescriptions from './prescriptions';
import prescriptionsList from './prescriptionsList';
import comparing from './comparing';

const rootReducer = combineReducers({
  application,
  auth,
  prescriptions,
  prescriptionsList,
  comparing,
  toast
});

export default rootReducer;
