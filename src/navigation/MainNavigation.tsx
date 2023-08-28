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
import AllPlans from "~screens/plans/AllPlans";
import PlanDetails from "~screens/plans/PlanDetails";
import FundWallet from "~screens/plans/FundWallet";
import ChoosePlanToFund from "~screens/plans/ChoosePlanToFund";
import SelectBank from "~components/plans/SelectBank";
import { GlobalStyles } from "~styles";

const { Navigator, Screen } =
  createNativeStackNavigator<MainNavigationParamList>();

export default function MainNavigation() {
  return (
    <Navigator
      initialRouteName={"Tab"}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: GlobalStyles.colors.screen.background,
        },
      }}
    >
      <Screen name={"Tab"} component={TabBarNavigation} />
      <Screen name={"CreatePlan"} component={CreatePlan} />
      <Screen name={"GoalName"} component={GoalName} />
      <Screen name={"TargetAmount"} component={TargetAmount} />
      <Screen name={"TargetDate"} component={TargetDate} />
      <Screen name={"ReviewCreatePlan"} component={ReviewCreatePlan} />
      <Screen name={"CreatePlanSuccessful"} component={CreatePlanSuccessful} />
      <Screen name={"AllPlans"} component={AllPlans} />
      <Screen name={"PlanDetails"} component={PlanDetails} />
      <Screen name={"FundWallet"} component={FundWallet} />
      <Screen name={"ChoosePlanToFund"} component={ChoosePlanToFund} />
      <Screen name={"SelectBank"} component={SelectBank} />
    </Navigator>
  );
}
