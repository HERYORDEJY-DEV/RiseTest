import { createSlice } from "@reduxjs/toolkit";
import { AuthenticationStateType } from "~types/store";

// Define a type for the slice state

// Define the initial state using that type
const initialState: AuthenticationStateType = {
  first_name: "",
  last_name: "",
  email_address: "",
  phone: "",
  token: null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    createAccount: (state, { payload }) => {
      Object.assign(state, {
        ...state,
        ...payload,
      });
    },
    updateUserOnSession: (state, { payload }) => {
      Object.assign(state, {
        ...state,
        ...payload,
      });
    },
  },
});

export const { createAccount, updateUserOnSession } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
