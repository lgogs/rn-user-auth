import { combineReducers, createStore } from 'redux';

import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  fullInfo: authReducer
});

const store = createStore(rootReducer);

export default store;