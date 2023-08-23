import { StyleProp, ViewStyle } from "react-native";

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

export type MainNavigationParamList = {
  Tab: undefined;
};
