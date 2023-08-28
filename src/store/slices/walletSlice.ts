import { createSlice } from "@reduxjs/toolkit";
import { WalletStateType } from "~types/store";

// Define a type for the slice state

// Define the initial state using that type
const initialState: WalletStateType = {
  total_balance: 0,
  total_returns: 0,
};

export const walletSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateWalletOnSignIn: (state, { payload }) => {
      Object.assign(state, {
        ...state,
        ...payload,
      });
    },
    updateWalletOnSession: (state, { payload }) => {
      Object.assign(state, {
        ...state,
        ...payload,
      });
    },
  },
});

export const { updateWalletOnSignIn, updateWalletOnSession } =
  walletSlice.actions;

export default walletSlice.reducer;
