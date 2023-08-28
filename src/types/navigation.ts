import { StyleProp, ViewStyle } from "react-native";
import { NavigatorScreenParams } from "@react-navigation/native";
import { PlanType } from "~types/plans";

export const enum TabScreen {
  Home = "Home",
  Plans = "Plans",
  Wallet = "Wallet",
  Feed = "Feed",
  Account = "Account",
}

export type TabScreenValue = (typeof TabScreen)[keyof typeof TabScreen];

type BottomTabRouteMap = Record<TabScreenValue, string>;

const bottomTabBarRoutesMap: BottomTabRouteMap = {
  Home: "Home",
  Plans: "Plans",
  Wallet: "Wallet",
  Feed: "Feed",
  Account: "Account",
};

export const toBottomBarRouteName = (
  screen: TabScreenValue,
  routesMap: Partial<BottomTabRouteMap> = bottomTabBarRoutesMap,
) => routesMap[screen] ?? "";

export type TabBarIndicatorProps = {
  tabCount: number;
  animatedStyle: StyleProp<ViewStyle>;
  height?: number;
  color?: string;
};

export type TabBarItemProps = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
  routeNames: Array<string>;
  animatedStyle: StyleProp<ViewStyle>;
};

export type TabStackNavigationParamList = {
  Home: undefined;
  Plans: undefined;
  Wallet: undefined;
  Feed: undefined;
  Account: undefined;
};

export type AuthNavigationParamList = {
  CreateAccount: { showNavBarBackButton?: boolean };
  AboutYou: { form?: { email: string; password: string } };
  AccountCreated: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  CreatPin: undefined;
  PinCreated: undefined;
  Onboarding: undefined;
  SplashScreen: undefined;
};

export type MainNavigationParamList = {
  Tab: NavigatorScreenParams<TabStackNavigationParamList>;
  CreatePlan: undefined | { screenPresentation?: string };
  GoalName: undefined;
  TargetAmount: {
    plan: {
      name: string;
    };
  };
  TargetDate: {
    plan: {
      name: string;
      amount: string;
    };
  };
  ReviewCreatePlan: {
    plan: {
      name: string;
      amount: string;
      date: Date | string;
    };
  };
  CreatePlanSuccessful: { plan: any };
  AllPlans: undefined;
  FundWallet: undefined;
  ChoosePlanToFund: undefined;
  PlanDetails: { plan: PlanType };
  SelectBank: { plan: PlanType };
};
