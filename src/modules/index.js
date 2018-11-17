import { combineReducers } from 'redux';
import { toastReducer as toast } from 'react-native-redux-toast';

import application from './application';
import auth from './auth';

const rootReducer = combineReducers({
  application,
  auth,
  toast
});

export default rootReducer;
