import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VerifyState {
  otp: number;
}

const initialState: VerifyState = {
  otp: 0,
};

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    setOtp(state, action: PayloadAction<number>) {
      state.otp = action.payload;
    },
    clearOtp(state) {
      state.otp = 0;
    },
  },
});

export const { setOtp, clearOtp } = verifySlice.actions;
export default verifySlice.reducer;