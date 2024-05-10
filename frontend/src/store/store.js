import { combineReducers, configureStore} from '@reduxjs/toolkit';
import authUserReducer from '.././Slices/userSlice'
import messageReducer from '.././Slices/messageSlice'
import socketReducer from '.././Slices/socketSlice'

import {
 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  user: authUserReducer,
  message: messageReducer,
  socket: socketReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),

})

export default store;