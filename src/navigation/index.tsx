import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "~navigation/MainNavigation";

interface Props {
  //
}

export default function RootNavigation(props: Props): JSX.Element {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
});
