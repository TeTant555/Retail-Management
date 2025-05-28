import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  userId: number; 
}

const initialState: AuthState = {
  email: "",
  userId: 0, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<AuthState>) {
      state.email = action.payload.email;
      state.userId = action.payload.userId ? action.payload.userId : 0;
    },
    clearUserData(state) {
      state.email = "";
      state.userId = 0; 
    },
  },
});

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;