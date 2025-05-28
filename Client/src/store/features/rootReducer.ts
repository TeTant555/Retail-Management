import { combineReducers } from "@reduxjs/toolkit";
import LoaderSlice from "./loaderSlice";
import authSlice from "./authSlice";
import verifySlice from "./verifySlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "verify", "cart"],
};

const rootReducer = combineReducers({
  loader: LoaderSlice,
  auth: authSlice,
  verify: verifySlice,
  cart: cartSlice
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
