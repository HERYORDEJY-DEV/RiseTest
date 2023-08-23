import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MainNavigationParamList } from "~types/navigation";
import TabBarNavigation from "~navigation/TabBarNavigation";

const { Navigator, Screen } =
  createNativeStackNavigator<MainNavigationParamList>();

export default function MainNavigation() {
  return (
    <Navigator initialRouteName={"Tab"} screenOptions={{ headerShown: false }}>
      <Screen name={"Tab"} component={TabBarNavigation} />
    </Navigator>
  );
}
