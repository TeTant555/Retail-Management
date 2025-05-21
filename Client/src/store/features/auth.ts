import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
}

const initialState: AuthState = {
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStoreEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    clearStoreEmail(state) {
      state.email = "";
    },
  },
});

export const { setStoreEmail, clearStoreEmail } = authSlice.actions;
export default authSlice.reducer;