import { store } from "~store";
import { PlanType } from "~types/plans";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface AuthenticationStateType {
  phone?: string;
  token: null | string;
  first_name: string;
  last_name: string;
  email_address: string;
  password?: string;
  date_of_birth?: string;
  username?: undefined | string;
}

export interface WalletStateType {
  total_balance: number;
  total_returns: number;
}

export interface PlansStateType {
  plans: {
    item_count: number;
    items: Array<PlanType>;
  };
}

export interface GeneralStateType {
  quote: {
    quote: string;
    author: string;
  };
  rates: {
    buy_rate: number;
    sell_rate: number;
  };
}
