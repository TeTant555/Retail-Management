import { combineReducers } from "@reduxjs/toolkit";
import LoaderSlice from "./loaderSlice";
import authSlice from "./auth";
import verifySlice from "./verify";
export const rootReducer
    = combineReducers({
    loader: LoaderSlice,
    auth: authSlice,
    verify: verifySlice
})