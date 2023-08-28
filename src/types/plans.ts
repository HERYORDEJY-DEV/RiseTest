import { SvgProps } from "react-native-svg";
import React from "react";

export type PlanReturnType = {
  id: string;
  created_at: string;
  plan_id: string;
  amount: number;
};

export interface PlanType {
  id: string;
  created_at: string;
  plan_name: string;
  invested_amount: number;
  total_returns: number;
  target_amount: number;
  maturity_date: string;
  user_id: string;
  returns: Array<PlanReturnType>;
}

export type FundWalletType = {
  icon: React.FC<SvgProps>;
  title: string;
  timeline: string;
  rate?: number;
  fee: number;
};
