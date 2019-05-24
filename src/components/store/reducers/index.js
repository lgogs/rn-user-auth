import { combineReducers } from 'redux';

import authReducer from './auth';

const rootReducer = combineReducers({
  fullInfo: authReducer
});

export default rootReducer;