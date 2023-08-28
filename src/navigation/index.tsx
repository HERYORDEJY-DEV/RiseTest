import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "~navigation/MainNavigation";
import AuthNavigation from "~navigation/AuthNavigation";
import { useAppSelector } from "~hooks/useStore";

interface Props {
  //
}

export default function RootNavigation(props: Props): JSX.Element {
  const authState = useAppSelector(state => state.authentication);
  return (
    <NavigationContainer>
      {Boolean(authState.token) ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
});
