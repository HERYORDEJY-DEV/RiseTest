import { createSlice } from "@reduxjs/toolkit";
import { PlansStateType } from "~types/store";

// Define a type for the slice state

// Define the initial state using that type
const initialState: PlansStateType = {
  plans: {
    items: [],
    item_count: 0,
  },
};

export const plansSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    createPlan: (state, { payload }) => {
      state.plans.items = [...state.plans.items, payload];
      state.plans.item_count = state.plans.items.length;
    },
    fetchPlans: (state, { payload }) => {
      state.plans = payload;
    },
  },
});

export const { createPlan, fetchPlans } = plansSlice.actions;

export default plansSlice.reducer;
