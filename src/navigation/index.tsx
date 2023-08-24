import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "~navigation/MainNavigation";
import AuthNavigation from "~navigation/AuthNavigation";

interface Props {
  //
}

export default function RootNavigation(props: Props): JSX.Element {
  return (
    <NavigationContainer>
      {1 + 1 === 2 ? <AuthNavigation /> : <MainNavigation />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
});
