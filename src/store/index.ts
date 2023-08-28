import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices";
import { Storage, persistReducer, persistStore } from "redux-persist";
import { MMKV } from "react-native-mmkv";
import logger from "redux-logger";

const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "RiseRnTest",
  version: 1,
  storage: reduxStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(
  persistConfig,
  reducer, // combineReducers(reducer),
);

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).prepend().concat(logger),

  reducer,
});

export let persistor = persistStore(store);
