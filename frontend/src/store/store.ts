import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";
import {
  listenerState,
  pointsReducer,
  IcoPointsReducer,
  isLogsCollapsed,
} from "./reducers";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  points: pointsReducer,
  icoPoints: IcoPointsReducer,
  listenerState: listenerState,
  isLogsCollapsed: isLogsCollapsed,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
