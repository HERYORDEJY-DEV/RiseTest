import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AuthNavigationParamList } from "~types/navigation";
import CreateAccount from "~screens/authentication/CreateAccount";
import AboutYou from "~screens/authentication/AboutYou";
import AccountCreated from "~screens/authentication/AccountCreated";
import SignIn from "~screens/authentication/SignIn";
import ForgotPassword from "~screens/authentication/ForgotPassword";
import CreatPin from "~screens/authentication/CreatPin";
import PinCreated from "~screens/authentication/PinCreated";
import Onboarding from "~screens/authentication/Onboarding";
import { GlobalStyles } from "~styles";

const { Navigator, Screen } =
  createNativeStackNavigator<AuthNavigationParamList>();

export default function AuthNavigation() {
  return (
    <Navigator
      // initialRouteName={"AboutYou"}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: GlobalStyles.colors.screen.background,
        },
      }}
    >
      {/*<Screen name={"SplashScreen"} component={SplashScreen} />*/}
      <Screen name={"Onboarding"} component={Onboarding} />
      <Screen name={"SignIn"} component={SignIn} />
      <Screen name={"CreateAccount"} component={CreateAccount} />
      <Screen name={"AboutYou"} component={AboutYou} />
      <Screen name={"AccountCreated"} component={AccountCreated} />
      <Screen name={"CreatPin"} component={CreatPin} />
      <Screen name={"ForgotPassword"} component={ForgotPassword} />
      <Screen name={"PinCreated"} component={PinCreated} />
    </Navigator>
  );
}
