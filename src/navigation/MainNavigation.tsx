import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MainNavigationParamList } from "~types/navigation";
import TabBarNavigation from "~navigation/TabBarNavigation";
import CreatePlan from "~screens/plans/CreatePlan";
import GoalName from "~screens/plans/GoalName";
import TargetAmount from "~screens/plans/TargetAmount";
import TargetDate from "~screens/plans/TargetDate";
import ReviewCreatePlan from "~screens/plans/ReviewCreatePlan";
import CreatePlanSuccessful from "~screens/plans/CreatePlanSuccessful";

const { Navigator, Screen } =
  createNativeStackNavigator<MainNavigationParamList>();

export default function MainNavigation() {
  return (
    <Navigator initialRouteName={"Tab"} screenOptions={{ headerShown: false }}>
      <Screen name={"Tab"} component={TabBarNavigation} />
      <Screen
        name={"CreatePlan"}
        component={CreatePlan}
        // options={{ presentation: "modal" }}
        // initialParams={{ screenPresentation: "modal" }}
      />
      <Screen name={"GoalName"} component={GoalName} />
      <Screen name={"TargetAmount"} component={TargetAmount} />
      <Screen name={"TargetDate"} component={TargetDate} />
      <Screen name={"ReviewCreatePlan"} component={ReviewCreatePlan} />
      <Screen name={"CreatePlanSuccessful"} component={CreatePlanSuccessful} />
    </Navigator>
  );
}
