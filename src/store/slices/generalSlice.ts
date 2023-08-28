import { createSlice } from "@reduxjs/toolkit";
import { GeneralStateType } from "~types/store";

// Define a type for the slice state

// Define the initial state using that type
const initialState: GeneralStateType = {
  quote: { quote: "", author: "" },
  rates: { buy_rate: 0, sell_rate: 0 },
};

export const generalSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateQuote: (state, { payload }) => {
      state.quote = payload;
    },
    updateRates: (state, { payload }) => {
      state.rates = payload;
    },
  },
});

export const { updateQuote, updateRates } = generalSlice.actions;

export default generalSlice.reducer;
