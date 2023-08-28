/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TextInput } from "react-native";
import setDefaultProps from "react-native-simple-default-props";
import { GlobalStyles } from "~styles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "~navigation";
import { Provider } from "react-redux";
import { store } from "~store";
import { WithSplashScreen } from "~navigation/SplashScreen";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App(): JSX.Element {
  const [isAppReady, setIsAppReady] = useState(false);

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

  setDefaultProps(TextInput, {
    style: {
      color: GlobalStyles.colors.text.title,
      fontSize: 15,
      fontFamily: GlobalStyles.fontFamily.sans.regular,
      backgroundColor: "transparent",
      height: "100%",
      flex: 1,
      //  textAlignVertical: 'bottom',
      paddingHorizontal: 10,
      // lineHeight: 17,
      //  paddingTop: 2,
    },
    placeholderTextColor: "#999999",
    underlineColorAndroid: "transparent",
    allowFontScaling: false,
  });

  async function initialize() {
    //
  }

  useEffect(() => {
    initialize().then(context => {
      setIsAppReady(true);
    });
  }, []);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <Provider store={store}>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <RootNavigation />
          </QueryClientProvider>
        </SafeAreaProvider>
      </Provider>
    </WithSplashScreen>
  );
}

export default App;
