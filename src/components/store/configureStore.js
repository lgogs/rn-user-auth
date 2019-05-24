import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from './reducers/index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer);
export const pStore = persistStore(store);

export default store;