/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { FlatList, ScrollView, Text } from "react-native";
import setDefaultProps from "react-native-simple-default-props";
import { GlobalStyles } from "~styles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "~navigation";

/*type SectionProps = PropsWithChildren<{
  title: string;
}>;*/

function App(): JSX.Element {
  // default props for Text component
  setDefaultProps(Text, {
    style: {
      color: GlobalStyles.colors.text.body,
      fontSize: 14,
      fontFamily: GlobalStyles.fontFamily.sans.regular,
    },
    allowFontScaling: false,
  });

  // default props for ScrollView component
  setDefaultProps(ScrollView, {
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    disableIntervalMomentum: true,
    keyboardDismissMode: "interactive",
  });

  // default props for FlatList component
  setDefaultProps(FlatList, {
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    disableIntervalMomentum: true,
  });

  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
}

export default App;
