import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Homepage from "~screens/homepage";
import CustomBottomTabBar from "~components/general/CustomBottomTabBar";
import { TabStackNavigationParamList } from "~types/navigation";
import Account from "~screens/account";
import Feed from "~screens/feed";
import Wallet from "~screens/wallet";
import Plans from "~screens/plans";

const { Navigator, Screen } =
  createBottomTabNavigator<TabStackNavigationParamList>();

export default function TabBarNavigation() {
  return (
    <Navigator
      initialRouteName={"Home"}
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomBottomTabBar {...props} />}
    >
      <Screen name={"Home"} component={Homepage} />
      <Screen name={"Plans"} component={Plans} />
      <Screen name={"Wallet"} component={Wallet} />
      <Screen name={"Feed"} component={Feed} />
      <Screen name={"Account"} component={Account} />
    </Navigator>
  );
}
